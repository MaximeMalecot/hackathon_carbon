import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { compareSync, hash } from "bcrypt";
import { MongoError } from "mongodb";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { EASY_ROLES, Role, User } from "./schemas/user.schema";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async create(createUserDto: CreateUserDto) {
        try {
            createUserDto.password = await hash(createUserDto.password, 10);
            if (!createUserDto.roles && !createUserDto.role)
                throw new BadRequestException(
                    "One of role or roles is required"
                );
            if (createUserDto.role) {
                if (!Object.keys(EASY_ROLES).includes(createUserDto.role))
                    throw new BadRequestException(
                        `Role ${createUserDto.role} is not a valid role`
                    );
                createUserDto.roles = EASY_ROLES[createUserDto.role];
            }
            createUserDto.roles = [
                ...new Set([...createUserDto.roles, Role.USER]),
            ];
            const res = new this.userModel({
                ...createUserDto,
            });
            return await res.save();
        } catch (error) {
            if (error instanceof MongoError) {
                if (error.code === 11000) {
                    throw new BadRequestException("email already used");
                }
            }
            throw new InternalServerErrorException(error.message);
        }
    }

    findAll() {
        return this.userModel.find().exec();
    }

    async findOne(id: string) {
        const user = await this.userModel.findOne({ _id: id });
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return user;
    }

    async findOneByEmail(email: string) {
        const user = await this.userModel
            .findOne({
                email: email,
            })
            .select("+password")
            .exec();
        if (!user) {
            throw new NotFoundException(`User with email ${email} not found`);
        }
        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        if (updateUserDto.password && !updateUserDto.oldPassword) {
            throw new BadRequestException("Old password is required");
        }
        if (updateUserDto.oldPassword) {
            let user = await this.userModel
                .findById(id)
                .select("+password")
                .exec();
            if (!user) {
                throw new NotFoundException(`User with id ${id} not found`);
            }
            if (!compareSync(updateUserDto.oldPassword, user.password)) {
                throw new BadRequestException("Old password is incorrect");
            }
            delete updateUserDto.oldPassword;
        }
        if (updateUserDto.password) {
            updateUserDto.password = await hash(updateUserDto.password, 10);
        }
        try {
            await this.userModel.updateOne({ _id: id }, updateUserDto);
            return;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async remove(id: string) {
        let user = await this.userModel.findById(id);
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        await this.userModel.deleteOne({ _id: id });
        return null;
    }

    async clear() {
        await this.userModel.deleteMany({});
    }
}

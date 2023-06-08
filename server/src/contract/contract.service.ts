import {
    BadRequestException,
    Inject,
    Injectable,
    forwardRef,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { DelivrableService } from "src/delivrable/delivrable.service";
import { EntrepriseService } from "src/entreprise/entreprise.service";
import { UsersService } from "src/users/users.service";
import { CreateContractDto } from "./dto/create-contract.dto";
import { FilterDto } from "./dto/filter.dto";
import { Contract, StatusEnum } from "./schemas/contract.schema";

@Injectable()
export class ContractService {
    constructor(
        @InjectModel(Contract.name) private contractModel: Model<Contract>,
        @Inject(forwardRef(() => EntrepriseService))
        private entrepriseService: EntrepriseService,
        private userService: UsersService,
        @Inject(forwardRef(() => DelivrableService))
        private delivrableService: DelivrableService
    ) {}

    async create(contractDto: CreateContractDto) {
        const entreprise = await this.entrepriseService.getEntreprise(
            contractDto.entrepriseId
        );
        const user = await this.userService.findOne(contractDto.userId);
        if (!entreprise) throw new BadRequestException("Entreprise not found");
        if (!user) throw new BadRequestException("User not found");
        const exists = await this.contractModel.findOne({
            userId: contractDto.userId,
            entrepriseId: contractDto.entrepriseId,
            status: StatusEnum.ACTIVE,
            startDate: {
                $gte: contractDto.startDate,
                $lte: contractDto.endDate,
            },
            endDate: {
                $gte: contractDto.startDate,
                $lte: contractDto.endDate,
            },
        });
        if (exists) throw new BadRequestException("Contract already exists");
        if (contractDto.startDate > contractDto.endDate)
            throw new BadRequestException("Start date must be before end date");
        const createdContract = new this.contractModel(contractDto);
        return await createdContract.save();
    }

    async findForUser(id: string, status?: StatusEnum) {
        if (status) {
            return await this.contractModel.find({
                userId: id,
                status: status,
            });
        }
        return await this.contractModel.find({
            userId: id,
        });
    }

    async findAll(filters?: FilterDto) {
        const query: any = {};
        if (filters) {
            if (filters.position)
                query.position = {
                    $regex: ".*" + filters.position + ".*",
                };
            if (filters.status) query.status = filters.status;
            if (filters.entrepriseId) query.entrepriseId = filters.entrepriseId;
            if (filters.userId) query.userId = filters.userId;
            if (filters.startDate)
                query.startDate = {
                    $gte: filters.startDate,
                };
            if (filters.endDate)
                query.endDate = {
                    $gte: filters.endDate,
                };
        }
        return await this.contractModel.find(query);
    }

    async findOne(id: Types.ObjectId) {
        return await this.contractModel.findById(id);
    }

    async findOneWithDelivrables(id: Types.ObjectId) {
        const contract = await this.contractModel.findById(id);
        if (!contract) throw new BadRequestException("Contract not found");
        const delivrables = await this.delivrableService.findForContract(
            contract._id
        );
        return {
            contract: contract,
            delivrables: delivrables,
        };
    }

    async updateStatus(id: string, status: StatusEnum) {
        const contract = await this.contractModel.findById(id);
        if (!contract) throw new BadRequestException("Contract not found");
        if (contract.status !== StatusEnum.ACTIVE)
            throw new BadRequestException("Contract is not active");
        return await this.contractModel.findByIdAndUpdate(
            id,
            {
                status: status,
            },
            { new: true }
        );
    }

    async getDelivrables(id: string) {
        const contract = await this.contractModel.findById(id);
        if (!contract) throw new BadRequestException("Contract not found");
        return await this.delivrableService.findForContract(contract._id);
    }

    async getUsersFromEntreprise(id: string) {
        const contracts = await this.contractModel.find({
            entrepriseId: id,
        });
        const users = [];
        for (const contract of contracts) {
            const user = await this.userService.findOneRestricted(
                contract.userId
            );
            if (user) users.push(user);
        }
        return users;
    }

    async isUserInEntreprise(
        userId: Types.ObjectId,
        entrepriseId: Types.ObjectId
    ) {
        const contract = await this.contractModel.findOne({
            userId: userId,
            entrepriseId: entrepriseId,
            status: StatusEnum.ACTIVE,
        });
        console.log(contract);
        return !!contract;
    }
}

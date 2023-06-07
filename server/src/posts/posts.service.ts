import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { ContractService } from "src/contract/contract.service";
import { StatusEnum } from "src/contract/schemas/contract.schema";
import { PostContentService } from "src/posts-content/posts-content.service";
import { Role, User } from "src/users/schemas/user.schema";
import { Post, PostTypes } from "./schemas/post.schema";

@Injectable()
export class PostService {
    constructor(
        @InjectModel(Post.name) private postModel: Model<Post>,
        private contractService: ContractService,
        @Inject(forwardRef(() => PostContentService))
        private postContentService: PostContentService
    ) {}

    async findAll(user: User, type?: PostTypes) {
        if (!user.roles.includes(Role.ADMIN)) {
            const contracts = await this.contractService.findForUser(
                user._id.toString(),
                StatusEnum.ACTIVE
            );
            return await this.postModel.aggregate([
                {
                    $match: {
                        $or: [
                            {
                                entrepriseId: {
                                    $in: contracts.map((c) => c.entrepriseId),
                                },
                            },
                            { entrepriseId: null },
                        ],
                    },
                },
                {
                    $sort: {
                        createdAt: -1,
                    },
                },
            ]);
        }
        return await this.postModel.find();
    }

    async findOne(id: string) {
        return await this.postModel.findById(id);
    }

    async create(user: User, body: any) {
        let data = {} as any;
        data.writerId = user._id;
        data = { ...data, ...body };

        const createdPost = new this.postModel(data);
        return await createdPost.save();
    }

    async delete(id: Types.ObjectId) {
        console.log("onéla");
        await this.postContentService.deleteContents(id);
        return await this.postModel.deleteOne(id);
    }
}

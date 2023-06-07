import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ContractService } from "src/contract/contract.service";
import { StatusEnum } from "src/contract/schemas/contract.schema";
import { Role, User } from "src/users/schemas/user.schema";
import { CreatePostContentDto } from "./dto/post-content.dto";
import { ContentType, Post, PostTypes } from "./schemas/post.schema";

@Injectable()
export class PostService {
    constructor(
        @InjectModel(Post.name) private postModel: Model<Post>,
        private contractService: ContractService
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

    async create(user: User, body: any) {
        let data = {} as any;
        data.writerId = user._id;
        data = { ...data, ...body };

        const createdPost = new this.postModel(data);
        return await createdPost.save();
    }

    async addContent(
        postId: string,
        type: ContentType,
        dto: CreatePostContentDto
    ) {
        const post = await this.postModel.findById(postId);
        if (!post) throw new Error("Post not found");
        const content = {
            type: type,
            data: dto.data,
            order: dto.order,
        };
        post.content.push(content);
        await post.save();
        return content;
    }
}

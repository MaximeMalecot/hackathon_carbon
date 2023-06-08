import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { ContractService } from "src/contract/contract.service";
import { StatusEnum } from "src/contract/schemas/contract.schema";
import { PostContentService } from "src/posts-content/posts-content.service";
import { Role, User } from "src/users/schemas/user.schema";
import { FindPostDto } from "./dto/find-post.dto";
import { Post, PostStatus, PostTypes } from "./schemas/post.schema";

@Injectable()
export class PostService {
    constructor(
        @InjectModel(Post.name) private postModel: Model<Post>,
        private contractService: ContractService,
        @Inject(forwardRef(() => PostContentService))
        private postContentService: PostContentService
    ) {}

    async findAll(user: User, filters?: FindPostDto) {
        let query: any = {};
        if (filters.search) {
            query = {
                $or: [
                    { title: { $regex: filters.search, $options: "i" } },
                    { description: { $regex: filters.search, $options: "i" } },
                ],
            };
        }
        if (filters.status) {
            query.status = PostTypes[filters.status];
        }
        if (filters.type) {
            query.type = PostTypes[filters.type];
        }
        if (!user.roles.includes(Role.ADMIN)) {
            const contracts = await this.contractService.findForUser(
                user._id.toString(),
                StatusEnum.ACTIVE
            );
            return await this.postModel
                .aggregate([
                    {
                        $match: {
                            $or: [
                                {
                                    entrepriseId: {
                                        $in: contracts.map(
                                            (c) => c.entrepriseId
                                        ),
                                    },
                                },
                                { entrepriseId: null },
                            ],
                        },
                    },
                    {
                        $match: query,
                    },
                    {
                        $sort: {
                            createdAt: -1,
                        },
                    },
                ])
                .limit(filters.limit)
                .skip(filters.skip);
        }
        return await this.postModel
            .find({
                ...query,
            })
            .limit(filters.limit)
            .skip(filters.skip);
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
        await this.postContentService.deleteContents(id);
        return await this.postModel.deleteOne(id);
    }

    async publish(id: Types.ObjectId) {
        return await this.postModel.findByIdAndUpdate(id, {
            status: PostStatus.PUBLISHED,
        });
    }
}

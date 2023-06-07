import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ContractService } from "src/contract/contract.service";
import { Role, User } from "src/users/schemas/user.schema";
import { Post, PostTypes } from "./schemas/post.schema";

@Injectable()
export class PostService {
    constructor(
        @InjectModel(Post.name) private postModel: Model<Post>,
        private contractService: ContractService
    ) {}

    async findAll(user: User, type?: PostTypes) {
        if (!user.roles.includes(Role.ADMIN)) {
            const globalPosts = await this.postModel.find({
                entreprise: null,
            });
            const contracts = this.contractService.findForUser(
                user._id.toString()
            );
        }
        return await this.postModel.find();
    }
}

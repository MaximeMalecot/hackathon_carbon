import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ContractService } from "src/contract/contract.service";
import { Post } from "./schemas/post.schema";

@Injectable()
export class PostService {
    private users = [];
    private entreprises = {};
    constructor(
        @InjectModel(Post.name) private postModel: Model<Post>,
        private contractService: ContractService
    ) {}

    convertMessage = ({ type, ...data }) => {
        console.log(`event: ${type}\n` + `data: ${JSON.stringify(data)}\n\n`);
        return `event: ${type}\n` + `data: ${JSON.stringify(data)}\n\n`;
    };

    broadcastSpecific = (message, userId) => {
        if (this.users[userId]) {
            this.users[userId].write(this.convertMessage(message));
        }
    };

    broadcastEnterprise = (message, entrepriseId) => {
        if (
            this.entreprises[entrepriseId] &&
            this.entreprises[entrepriseId].length > 0
        ) {
            this.entreprises[entrepriseId].map((userId) => {
                this.broadcastSpecific(message, userId);
            });
        }
    };

    addUser = async (userId, res) => {
        this.users[userId] = res;
        const currentContracts = await this.contractService.findForUser(userId);
        if (currentContracts.length > 0) {
            currentContracts.map((contract) => {
                this.entreprises[contract.entrepriseId].push(userId);
            });
        }
    };

    deleteUser = async (userId) => {
        delete this.users[userId];
        const currentContracts = await this.contractService.findForUser(userId);
        if (currentContracts.length > 0) {
            currentContracts.map((contract) => {
                this.entreprises[contract.entrepriseId].splice(
                    this.entreprises[contract.entrepriseId].indexOf(userId),
                    1
                );
            });
        }
    };
}

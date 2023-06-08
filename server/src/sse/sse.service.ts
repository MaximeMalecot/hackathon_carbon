import { Injectable } from "@nestjs/common";
import { ContractService } from "src/contract/contract.service";
import { StatusEnum } from "src/contract/schemas/contract.schema";

@Injectable()
export class SseService {
    private users = [];
    private entreprises = {};
    constructor(private contractService: ContractService) {}

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
            for (let contract of currentContracts) {
                if (!this.entreprises[contract.entrepriseId])
                    this.entreprises[contract.entrepriseId] = [];
                this.entreprises[contract.entrepriseId].push(userId);
            }
        }
    };

    deleteUser = async (userId) => {
        delete this.users[userId];
        const currentContracts = await this.contractService.findForUser(
            userId,
            StatusEnum.ACTIVE
        );
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

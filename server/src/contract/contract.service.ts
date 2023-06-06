import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Contract } from "./schemas/contract.schema";

@Injectable()
export class ContractService {
    constructor(
        @InjectModel(Contract.name) private contractModel: Model<Contract>
    ) {}

    async findForUser(id: string) {
        return await this.contractModel.find({
            userId: id,
            isActive: true,
        });
    }
}

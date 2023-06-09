import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { PrizeService } from "src/prize/prize.service";
import { UsersService } from "src/users/users.service";
import { Transaction } from "./schemas/transaction.schema";

@Injectable()
export class TransactionService {
    constructor(
        @InjectModel(Transaction.name)
        private transactionModel: Model<Transaction>,
        private prizeService: PrizeService,
        private userService: UsersService
    ) {}

    async create(userId: string, prizeId: string) {
        const prize = await this.prizeService.findOne(prizeId);
        const user = await this.userService.findOne(userId);
        const newTransaction = await this.transactionModel.create({
            userId,
            prizeId,
            points: prize.price,
            prizeName: prize.name,
            user: user,
        });
        const savedTransaction = await newTransaction.save();
        return savedTransaction;
    }

    async findAllForUser(userId: Types.ObjectId) {
        const transactions = await this.transactionModel.find({
            userId: userId,
        });
        return transactions;
    }
}

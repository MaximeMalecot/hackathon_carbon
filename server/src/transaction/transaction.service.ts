import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
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
        if (user.experiencePoints < prize.price)
            throw new BadRequestException("Not enough points");
        if (prize.quantity <= 0)
            throw new BadRequestException("Prize out of stock");
        const newTransaction = await this.transactionModel.create({
            userId,
            prizeId: prize._id,
            price: prize.price,
        });
        await newTransaction.save();
        await this.prizeService.updateStock(prizeId, prize.quantity - 1);
        await this.userService.removePointsFromUser(userId, prize.price);
        return {
            success: true,
            message: "Transaction created",
        };
    }

    async findAllForUser(userId: string) {
        const transactions = await this.transactionModel.aggregate([
            {
                $match: {
                    userId: userId,
                },
            },
            {
                $lookup: {
                    from: "prizes",
                    localField: "prizeId",
                    foreignField: "_id",
                    as: "prize",
                },
            },
            {
                $unwind: "$prize",
            },
        ]);
        return transactions;
    }
}

import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PrizeModule } from "src/prize/prize.module";
import { UsersModule } from "src/users/users.module";
import { Transaction, TransactionSchema } from "./schemas/transaction.schema";
import { TransactionController } from "./transaction.controller";
import { TransactionService } from "./transaction.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Transaction.name, schema: TransactionSchema },
        ]),
        PrizeModule,
        UsersModule,
    ],
    controllers: [TransactionController],
    providers: [TransactionService],
})
export class TransactionModule {}

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema()
export class Transaction {
    id: string;
    _id: Types.ObjectId;

    @Prop({
        type: Types.ObjectId,
        required: true,
        ref: "user",
    })
    userId: string;

    @Prop({
        type: Types.ObjectId,
        required: true,
        ref: "prize",
    })
    prizeId: string;

    @Prop({
        type: Number,
        required: true,
    })
    price: number;

    @Prop({
        type: Date,
        required: true,
        default: Date.now,
    })
    createdAt: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);

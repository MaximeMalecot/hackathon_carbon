import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type SchemaDocument = HydratedDocument<Prize>;

@Schema()
export class Prize {
    id: string;
    _id: Types.ObjectId;

    @Prop({
        type: String,
        required: true,
    })
    name: string;

    @Prop({
        type: String,
    })
    description: string;

    @Prop({
        type: Number,
        required: true,
    })
    price: number;

    @Prop({
        type: Number,
        required: true,
        default: 0,
    })
    quantity: number = 0;

    @Prop({
        type: String,
        required: true,
    })
    image: string;

    @Prop({
        type: Date,
        required: true,
        default: Date.now,
    })
    createdAt: Date;

    @Prop({
        type: Date,
    })
    updatedAt: Date;
}

export const PrizeSchema = SchemaFactory.createForClass(Prize);

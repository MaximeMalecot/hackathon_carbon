import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type ContractDocument = HydratedDocument<Contract>;

export enum Status {}

@Schema()
export class Contract {
    @Prop({
        type: String,
        required: true,
    })
    position: string;

    @Prop({
        type: Types.ObjectId,
        ref: "user",
    })
    userId: string;

    @Prop({
        type: Types.ObjectId,
        ref: "entreprise",
    })
    entrepriseId: string;

    @Prop({
        type: Boolean,
        required: true,
        default: true,
    })
    isActive: boolean;

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

export const ContractSchema = SchemaFactory.createForClass(Contract);

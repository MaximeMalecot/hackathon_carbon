import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type ContractDocument = HydratedDocument<Contract>;

export enum StatusEnum {
    ACTIVE = "ACTIVE",
    CANCELED = "CANCELED",
    FINISHED = "FINISHED",
}

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
        type: String,
        enum: StatusEnum,
        required: true,
        default: StatusEnum.ACTIVE,
    })
    status: StatusEnum;

    @Prop({
        type: Date,
        required: true,
        default: Date.now,
    })
    createdAt: Date;

    @Prop({
        type: Date,
    })
    startDate: Date;

    @Prop({
        type: Date,
    })
    endDate: Date;
}

export const ContractSchema = SchemaFactory.createForClass(Contract);

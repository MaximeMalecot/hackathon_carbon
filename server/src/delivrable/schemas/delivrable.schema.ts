import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type DelivrableDocument = HydratedDocument<Delivrable>;

@Schema()
export class Delivrable {
    @Prop({
        type: String,
        required: true,
    })
    title: string;

    @Prop({
        type: String,
        required: true,
    })
    file: string;

    @Prop({
        type: Types.ObjectId,
        ref: "contract",
    })
    contractId: string;
}

export const DelivrableSchema = SchemaFactory.createForClass(Delivrable);

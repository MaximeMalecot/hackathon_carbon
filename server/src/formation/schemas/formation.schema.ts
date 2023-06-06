import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type FormationDocument = HydratedDocument<Formation>;

@Schema()
export class Formation {
    id: string;

    @Prop({
        type: String,
        required: true,
    })
    name: string;

    @Prop({
        type: Date,
        required: true,
        default: Date.now(),
    })
    createdAt: Date;

    @Prop({
        type: Types.ObjectId,
        ref: "user",
    })
    referent?: string;
}

export const FormationSchema = SchemaFactory.createForClass(Formation);

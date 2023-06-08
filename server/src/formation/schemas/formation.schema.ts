import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type FormationDocument = HydratedDocument<Formation>;

export enum Level {
    EASY = 200,
    MEDIUM = 400,
    HARD = 600,
}
@Schema()
export class Formation {
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

    @Prop({
        type: Number,
        required: true,
        default: Level.EASY,
    })
    level: Level;
}

export const FormationSchema = SchemaFactory.createForClass(Formation);

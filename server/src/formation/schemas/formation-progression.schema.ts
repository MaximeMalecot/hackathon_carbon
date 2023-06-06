import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type FormationProgressionDocument =
    HydratedDocument<FormationProgression>;

@Schema()
export class FormationProgression {
    id: string;

    @Prop({
        type: Types.ObjectId,
        ref: "formation",
    })
    formationId: string;

    @Prop({
        type: Types.ObjectId,
        ref: "user",
    })
    userId: string;

    @Prop({
        type: Date,
        required: false,
    })
    finished: Date | null;

    @Prop({
        type: Array<String>,
        required: true,
    })
    chaptersDone: string[];
}

export const FormationProgressionSchema =
    SchemaFactory.createForClass(FormationProgression);

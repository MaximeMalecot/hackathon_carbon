import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type FormationChapterDocument = HydratedDocument<FormationChapter>;

export enum ChapterTypes {
    QUIZ = "QUIZ",
    RESOURCE = "RESOURCE",
}

@Schema()
export class FormationChapter {
    @Prop({
        type: Number,
        required: true,
        default: 0,
    })
    order: BigInt;

    @Prop({
        type: String,
        required: true,
    })
    name: string;

    @Prop({
        type: String,
        enum: ChapterTypes,
        required: true,
    })
    type: ChapterTypes;

    @Prop({
        type: Types.ObjectId,
        required: true,
        ref: "formation",
    })
    formationId: string;
}

export const FormationChapterSchema =
    SchemaFactory.createForClass(FormationChapter);

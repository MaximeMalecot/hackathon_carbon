import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type QuizDocument = HydratedDocument<Quiz>;
@Schema()
export class Quiz {
    @Prop({
        type: String,
        required: true,
    })
    title: string;

    @Prop({
        type: String,
        required: true,
    })
    description: string;

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

    @Prop({
        type: Types.ObjectId,
        required: true,
        ref: "formation_chapter",
    })
    chapterId: string;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);

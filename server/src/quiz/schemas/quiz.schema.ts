import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type QuizDocument = HydratedDocument<Quiz>;

export enum Level {
    EASY = 200,
    MEDIUM = 400,
    HARD = 600,
}

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
        type: Number,
        required: true,
    })
    level: Level;

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

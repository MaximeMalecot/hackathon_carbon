import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type QuestionDocument = HydratedDocument<Question>;

type Answer = {
    id: string;
    label: string;
    isCorrect: boolean;
};

@Schema()
export class Question {
    @Prop({
        type: String,
        required: true,
    })
    label: string;

    @Prop({
        type: Array<Answer>(),
        required: true,
    })
    answers: Answer[];

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

export const QuestionSchema = SchemaFactory.createForClass(Question);

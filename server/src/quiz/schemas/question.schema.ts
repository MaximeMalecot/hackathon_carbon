import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsBoolean, IsString } from "class-validator";
import { HydratedDocument, Types } from "mongoose";

export type QuestionDocument = HydratedDocument<Question>;

class AnswerDto {
    @IsString()
    label: string;

    @IsBoolean()
    isCorrect: boolean;
}

@Schema()
export class Question {
    id: string;

    @Prop({
        type: String,
        required: true,
    })
    label: string;

    @Prop({
        type: Array<AnswerDto>(),
        required: true,
    })
    answers: AnswerDto[];

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
        ref: "quiz",
    })
    quizId: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);

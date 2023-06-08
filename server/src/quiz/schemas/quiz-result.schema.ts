import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type QuizResultDocument = HydratedDocument<QuizResult>;

@Schema()
export class QuizResult {
    id: string;

    @Prop({
        type: Number,
        required: true,
    })
    mark: BigInt;

    @Prop({
        type: Date,
        required: true,
        default: Date.now,
    })
    createdAt: Date;

    @Prop({
        type: Types.ObjectId,
        required: true,
        ref: "user",
    })
    userId: string;

    @Prop({
        type: Types.ObjectId,
        required: true,
        ref: "quiz",
    })
    quizId: string;
}

export const QuizResultSchema = SchemaFactory.createForClass(QuizResult);

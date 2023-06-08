import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { QuizResult } from "./schemas/quiz-result.schema";

@Injectable()
export class QuizResultService {
    constructor(
        @InjectModel(QuizResult.name) private quizResultModel: Model<QuizResult>
    ) {}

    async createResult(quizId: string, userId: string, mark: number) {
        const result = await this.quizResultModel.create({
            quizId,
            userId,
            mark,
        });
        return result;
    }

    async getResultsByUserId(userId: string) {
        return this.quizResultModel.find({ userId }).exec();
    }

    async getResultOfQuizByUserId(quizId: string, userId: string) {
        return this.quizResultModel.findOne({ quizId, userId }).exec();
    }
}

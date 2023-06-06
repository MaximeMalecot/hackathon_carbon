import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Question } from "./schemas/question.schema";
import { Quiz } from "./schemas/quiz.schema";

@Injectable()
export class QuizService {
    constructor(
        @InjectModel(Quiz.name) private quizModel: Model<Quiz>,
        @InjectModel(Question.name) private questionModel: Model<Question>
    ) {}

    async findAll() {
        const quizzes = await this.quizModel.find().exec();
        const questions = await this.questionModel.find().exec();
        return { quizzes, questions };
    }
}

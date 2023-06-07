import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { CreateQuizDto } from "./dto/create-quiz.dto";
import { UpdateQuestionDto } from "./dto/update-question.dto";
import { Question } from "./schemas/question.schema";
import { Quiz } from "./schemas/quiz.schema";

@Injectable()
export class QuizService {
    constructor(
        @InjectModel(Quiz.name) private quizModel: Model<Quiz>,
        @InjectModel(Question.name) private questionModel: Model<Question>
    ) {}

    async findAllQuestions() {
        return this.questionModel.find().exec();
    }

    async findAllQuizzes() {
        return this.quizModel.find().exec();
    }

    async findOne(quizId: string) {
        return this.quizModel.findOne({ quizId }).exec();
    }

    async getQuestionsFromQuiz(quizId: string) {
        return this.questionModel.find({ quizId }).exec();
    }

    async createQuestion(quizId: string, question: CreateQuestionDto) {
        if (!quizId) throw new Error("No quizId provided");

        const newQuestion = new this.questionModel({ ...question, quizId });
        await newQuestion.save();
        return newQuestion;
    }

    async createQuestions(quizId: string, questions: CreateQuestionDto[]) {
        if (!questions.length) throw new Error("No questions provided");

        return await Promise.all(
            questions.map((question) => this.createQuestion(quizId, question))
        );
    }

    async createQuiz(quiz: CreateQuizDto) {
        const newQuiz = new this.quizModel(quiz);
        const savedQuiz = await newQuiz.save();
        return savedQuiz;
    }

    async updateQuestion(questionId, newQuestion: UpdateQuestionDto) {
        return this.questionModel.findByIdAndUpdate(questionId, newQuestion);
    }
}

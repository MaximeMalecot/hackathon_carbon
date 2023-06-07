import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as crypto from "crypto";
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

    async findOne(quizId: string) {
        return this.quizModel.findById(quizId).exec();
    }

    async getQuestionsAndFullAnswers(quizId: string) {
        const quiz = await this.quizModel.findById(quizId).exec();
        const questions = await this.questionModel.find({ quizId }).exec();
        return { ...quiz.toObject(), questions };
    }

    async getQuestionsWithAnswers(quizId: string) {
        const quiz = await this.quizModel.findById(quizId).exec();
        if (!quiz) throw new NotFoundException("No quiz found");

        let questions = await this.questionModel.find({ quizId });
        const questionsWithoutFullAnswers = questions.map((question) => {
            const answers = question.answers.map((answer) => {
                delete answer.isCorrect;
                return answer;
            });
            return { ...question.toObject(), answers };
        });

        return { ...quiz.toObject(), questions: questionsWithoutFullAnswers };
    }

    async findOneByChapterId(chapterId: string) {
        return this.quizModel.findOne({ chapterId }).exec();
    }

    async createQuestion(quizId: string, question: CreateQuestionDto) {
        if (!quizId) throw new Error("No quizId provided");
        if (question.answers.length < 2)
            throw new BadRequestException("Not enough answers provided");

        const answers = question.answers.map((answer) => {
            return {
                id: crypto.randomUUID(),
                ...answer,
            };
        });

        const newQuestion = new this.questionModel({
            ...question,
            quizId,
            answers,
        });
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

    async updateQuestion(questionId: string, newQuestion: UpdateQuestionDto) {
        return this.questionModel.findByIdAndUpdate(questionId, newQuestion);
    }
}

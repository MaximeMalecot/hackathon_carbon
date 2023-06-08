import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as crypto from "crypto";
import { Model } from "mongoose";
import { CompleteQuizDto } from "./dto/complete-quiz.dto";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { CreateQuizDto } from "./dto/create-quiz.dto";
import { UpdateQuestionDto } from "./dto/update-question.dto";
import { QuizResultService } from "./quiz-result.service";
import { Question } from "./schemas/question.schema";
import { Quiz } from "./schemas/quiz.schema";

@Injectable()
export class QuizService {
    constructor(
        @InjectModel(Quiz.name) private quizModel: Model<Quiz>,
        @InjectModel(Question.name) private questionModel: Model<Question>,
        private readonly quizResultService: QuizResultService
    ) {}

    async findOne(quizId: string) {
        return this.quizModel.findById(quizId).exec();
    }

    async getQuestionsAndFullAnswers(quizId: string) {
        const quiz = await this.quizModel.findById(quizId).exec();
        if (!quiz) throw new NotFoundException("No quiz found");
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

    async completeQuiz(userId, completeQuizDto: CompleteQuizDto) {
        const { quizId, answers } = completeQuizDto;

        const quizAndAnswers = await this.getQuestionsAndFullAnswers(quizId);
        if (!quizAndAnswers) throw new NotFoundException("No quiz found");
        const questions = quizAndAnswers.questions;
        const { percentage } = this.getMark(answers, questions);
        await this.quizResultService.createResult(quizId, userId, percentage);
        return { mark: `${percentage}%` };
    }

    usersAnswers = [
        {
            questionId: "1",
            answers: ["1", "2"],
        },
        {
            questionId: "2",
            answers: ["3"],
        },
    ];

    corrects = {
        questionId: ["1", "2"],
    };

    private getMark(userAnswers, questions: Question[]) {
        const eqSet = (xs, ys) =>
            xs.size === ys.size && [...xs].every((x) => ys.has(x));

        let correctAnswersCount = 0;
        const answersPerQuestion = questions
            .map((question) => {
                const answers = question.answers
                    .filter((a) => a.isCorrect)
                    .map((a) => a.id);
                return { [question.id]: answers };
            })
            .reduce((acc, curr) => ({ ...acc, ...curr }), {});

        const mark = userAnswers.reduce((acc, curr) => {
            const answers = answersPerQuestion[curr.questionId];
            if (!answers) return acc;
            const hasCorrectAnswers = eqSet(
                new Set(answers),
                new Set(curr.answers)
            );
            return hasCorrectAnswers ? acc + 1 : acc;
        }, 0);

        const percentage = (mark / questions.length) * 100;
        return {
            mark,
            percentage: percentage,
        };
    }
}

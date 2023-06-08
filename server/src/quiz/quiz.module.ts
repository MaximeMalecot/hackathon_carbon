import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { QuizResultService } from "./quiz-result.service";
import { QuizController } from "./quiz.controller";
import { QuizService } from "./quiz.service";
import { Question, QuestionSchema } from "./schemas/question.schema";
import { QuizResult, QuizResultSchema } from "./schemas/quiz-result.schema";
import { Quiz, QuizSchema } from "./schemas/quiz.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Question.name, schema: QuestionSchema },
            { name: QuizResult.name, schema: QuizResultSchema },
            { name: Quiz.name, schema: QuizSchema },
        ]),
    ],
    controllers: [QuizController],
    providers: [QuizService, QuizResultService],
    exports: [QuizService],
})
export class QuizModule {}

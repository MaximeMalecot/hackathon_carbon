import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { QuizController } from "./quiz.controller";
import { QuizService } from "./quiz.service";
import { Question, QuestionSchema } from "./schemas/question.schema";
import { Quiz, QuizSchema } from "./schemas/quiz.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Question.name, schema: QuestionSchema },
            { name: Quiz.name, schema: QuizSchema },
        ]),
    ],
    controllers: [QuizController],
    providers: [QuizService],
    exports: [],
})
export class QuizModule {}

import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { QuizService } from "./quiz.service";

@ApiTags("quiz")
@Controller("quiz")
export class QuizController {
    constructor(private readonly quizService: QuizService) {}

    @Get("")
    findAllQuizzes() {
        return this.quizService.findAllQuizzes();
    }

    @Get(":quizId")
    findOne(@Param("quizId") quizId: string) {
        return this.quizService.findOne(quizId);
    }

    //Question routes

    @Get(":quizId/questions")
    getQuestionsFromQuiz(@Param("quizId") quizId: string) {
        return this.quizService.getQuestionsFromQuiz(quizId);
    }

    @Post(":quizId/question")
    createQuestion(
        @Param("quizId") quizId: string,
        @Body() question: CreateQuestionDto
    ) {
        return this.quizService.createQuestion(quizId, question);
    }

    @Patch("question/:questionId")
    updateQuestion(
        @Param("questionId") questionId: string,
        @Body() question: CreateQuestionDto
    ) {
        return this.quizService.updateQuestion(questionId, question);
    }
}

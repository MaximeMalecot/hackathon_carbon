import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { UpdateQuestionDto } from "./dto/update-question.dto";
import { QuizService } from "./quiz.service";

@ApiTags("quiz")
@Controller("quiz")
export class QuizController {
    constructor(private readonly quizService: QuizService) {}

    @Get(":quizId")
    findOne(@Param("quizId") quizId: string) {
        return this.quizService.findOne(quizId);
    }

    //Question routes
    @Get(":quizId/questions")
    getQuestionsWithAnswersFromQuiz(@Param("quizId") quizId: string) {
        return this.quizService.getQuestionsWithAnswers(quizId);
    }

    @Post(":quizId/question")
    async createQuestion(
        @Param("quizId") quizId: string,
        @Body() question: CreateQuestionDto
    ) {
        const exists = await this.quizService.findOne(quizId);
        if (!exists) throw new NotFoundException("Quiz does not exist");
        return this.quizService.createQuestion(quizId, question);
    }

    @Patch("question/:questionId")
    updateQuestion(
        @Param("questionId") questionId: string,
        @Body() question: UpdateQuestionDto
    ) {
        return this.quizService.updateQuestion(questionId, question);
    }
}

import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
    Req,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Roles } from "src/auth/decorators/roles.decorator";
import { CheckObjectIdPipe } from "src/pipes/checkobjectid.pipe";
import { Role } from "src/users/schemas/user.schema";
import { CompleteQuizDto } from "./dto/complete-quiz.dto";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { UpdateQuestionDto } from "./dto/update-question.dto";
import { QuizService } from "./quiz.service";

@ApiTags("quiz")
@Controller("quiz")
export class QuizController {
    constructor(private readonly quizService: QuizService) {}

    @Get(":quizId")
    findOne(@Param("quizId", CheckObjectIdPipe) quizId: string) {
        return this.quizService.findOne(quizId);
    }

    //Question routes
    @Get(":quizId/questions")
    getQuestionsWithAnswersFromQuiz(
        @Param("quizId", CheckObjectIdPipe) quizId: string
    ) {
        return this.quizService.getQuestionsWithAnswers(quizId);
    }

    @Get(":quizId/full-questions")
    @Roles(Role.TEACHER)
    getQuestionsWithFullAnswersFromQuiz(
        @Param("quizId", CheckObjectIdPipe) quizId: string
    ) {
        return this.quizService.getQuestionsAndFullAnswers(quizId);
    }

    @Get(":chapterId/quiz")
    getQuizByChapterId(
        @Param("chapterId", CheckObjectIdPipe) chapterId: string
    ) {
        return this.quizService.findOneByChapterId(chapterId);
    }

    @Post(":quizId/question")
    @Roles(Role.TEACHER)
    async createQuestion(
        @Param("quizId", CheckObjectIdPipe) quizId: string,
        @Body() question: CreateQuestionDto
    ) {
        const exists = await this.quizService.findOne(quizId);
        if (!exists) throw new NotFoundException("Quiz does not exist");
        return this.quizService.createQuestion(quizId, question);
    }

    @Patch("question/:questionId")
    @Roles(Role.TEACHER)
    updateQuestion(
        @Param("questionId", CheckObjectIdPipe) questionId: string,
        @Body() question: UpdateQuestionDto
    ) {
        return this.quizService.updateQuestion(questionId, question);
    }

    @Post("complete")
    async completeQuiz(@Body() body: CompleteQuizDto, @Req() req: any) {
        return this.quizService.completeQuiz(req.user.id, body);
    }
}

import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Role } from "src/users/schemas/user.schema";
import {
    CreateQuizChapterDto,
    CreateResourceChapterDto,
} from "./dto/create-formation_chapter.dto";
import { FormationChapterService } from "./formation_chapter.service";

@ApiTags("formation-chapter")
@Controller("formation-chapter")
export class FormationChapterController {
    constructor(
        private readonly formationChapterService: FormationChapterService
    ) {}

    @Post(":formationId/quiz")
    @Roles(Role.TEACHER)
    createQuiz(
        @Body()
        createFormationChapterDto: CreateQuizChapterDto,
        @Param("formationId") formationId: string
    ) {
        return this.formationChapterService.createChapterAndQuiz(
            formationId,
            createFormationChapterDto
        );
    }

    @Post(":formationId/resource")
    @Roles(Role.TEACHER)
    createResource(
        @Body()
        createFormationChapterDto: CreateResourceChapterDto,
        @Param("formationId") formationId: string
    ) {
        return this.formationChapterService.createChapterAndResource(
            formationId,
            createFormationChapterDto
        );
    }

    @Get("formation/:formationId")
    findAllForAFormation(@Param("formationId") formationId: string) {
        return this.formationChapterService.findAllForAFormation(formationId);
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.formationChapterService.findOne(id);
    }

    @Delete(":id")
    @Roles(Role.TEACHER)
    remove(@Param("id") id: string) {
        return this.formationChapterService.remove(id);
    }
}

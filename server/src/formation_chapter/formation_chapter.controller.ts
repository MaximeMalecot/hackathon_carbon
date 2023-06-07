import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Role } from "src/users/schemas/user.schema";
import { CreateFormationChapterDto } from "./dto/create-formation_chapter.dto";
import { FormationChapterService } from "./formation_chapter.service";

@ApiTags("formation-chapter")
@Controller("formation-chapter")
export class FormationChapterController {
    constructor(
        private readonly formationChapterService: FormationChapterService
    ) {}

    @Post(":formationId")
    @Roles(Role.TEACHER)
    create(
        @Body()
        createFormationChapterDto: CreateFormationChapterDto,
        @Param("formationId") formationId: string
    ) {
        return this.formationChapterService.create(
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

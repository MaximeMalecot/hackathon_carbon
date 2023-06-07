import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateFormationChapterDto } from "./dto/create-formation_chapter.dto";
import { FormationChapterService } from "./formation_chapter.service";

@ApiTags("formation-chapter")
@Controller("formation-chapter")
export class FormationChapterController {
    constructor(
        private readonly formationChapterService: FormationChapterService
    ) {}

    @Post(":formationId")
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

    // @Post(":formationId")
    // getChapterFromFormation(@Param("formationId") formationId: string) {}

    @Get("formation/:formationId")
    findAllForAFormation(@Param("formationId") formationId: string) {
        return this.formationChapterService.findAllForAFormation(formationId);
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.formationChapterService.findOne(id);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.formationChapterService.remove(id);
    }
}

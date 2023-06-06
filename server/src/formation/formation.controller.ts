import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from "@nestjs/common";
import { Public } from "src/auth/decorators/public.decator";
import { CreateFormationDto } from "./dto/create-formation.dto";
import { UpdateFormationDto } from "./dto/update-formation.dto";
import { FormationService } from "./services/formation.service";

@Controller("formations")
export class FormationController {
    constructor(private readonly formationService: FormationService) {}

    @Public()
    @Post()
    create(@Body() createFormationDto: CreateFormationDto) {
        return this.formationService.create(createFormationDto);
    }

    @Public()
    @Get()
    findAll() {
        return this.formationService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.formationService.findOne(id);
    }

    @Patch(":id")
    update(
        @Param("id") id: string,
        @Body() updateFormationDto: UpdateFormationDto
    ) {
        return this.formationService.update(id, updateFormationDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.formationService.remove(id);
    }

    @Public()
    @Get(":formationId/progression/:userId")
    getUserProgress(
        @Param("formationId") formationId: string,
        @Param("userId") userId: string
    ) {
        return this.formationService.getCurrentFormationsOfUser(
            formationId,
            userId
        );
    }
}

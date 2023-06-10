import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Req,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Roles } from "src/auth/decorators/roles.decorator";
import { CheckObjectIdPipe } from "src/pipes/checkobjectid.pipe";
import { Role } from "src/users/schemas/user.schema";
import { CreateFormationDto } from "./dto/create-formation.dto";
import { UpdateFormationDto } from "./dto/update-formation.dto";
import { FormationService } from "./services/formation.service";

@ApiTags("formations")
@Controller("formations")
export class FormationController {
    constructor(private readonly formationService: FormationService) {}

    @Post()
    @Roles(Role.TEACHER)
    create(@Body() createFormationDto: CreateFormationDto, @Req() req: any) {
        return this.formationService.create(createFormationDto, req.user.id);
    }

    @Get("levels")
    getTypes() {
        return this.formationService.getLevels();
    }

    @Get()
    findAll() {
        return this.formationService.findAll();
    }

    @Get(":id")
    findOne(@Param("id", CheckObjectIdPipe) id: string) {
        return this.formationService.findOne(id);
    }

    @Patch(":id")
    @Roles(Role.TEACHER)
    update(
        @Param("id", CheckObjectIdPipe) id: string,
        @Body() updateFormationDto: UpdateFormationDto
    ) {
        return this.formationService.update(id, updateFormationDto);
    }

    @Delete(":id")
    @Roles(Role.ADMIN)
    remove(@Param("id", CheckObjectIdPipe) id: string) {
        return this.formationService.remove(id);
    }

    @Get(":formationId/progression/self")
    getSelfProgressionOnFormation(
        @Param("formationId", CheckObjectIdPipe) formationId: string,
        @Req() req: any
    ) {
        return this.formationService.getUserProgressionOnFormation(
            formationId,
            req.user._id
        );
    }

    @Roles(Role.VIEWER)
    @Get(":formationId/progression/:userId")
    getProgressionOfUserOnFormation(
        @Param("formationId", CheckObjectIdPipe) formationId: string,
        @Param("userId", CheckObjectIdPipe) userId: string
    ) {
        return this.formationService.getUserProgressionOnFormation(
            formationId,
            userId
        );
    }

    @Get("current/self")
    getSelfCurrentFormations(@Req() req: any) {
        return this.formationService.getCurrentFormationsOfUser(req.user._id);
    }

    @Roles(Role.VIEWER)
    @Get("current/:userId")
    getCurrentFormationsOfUser(
        @Param("userId", CheckObjectIdPipe) userId: string
    ) {
        return this.formationService.getCurrentFormationsOfUser(userId);
    }

    // DEV ONLY
    @Post(":formationId/progression")
    @Roles(Role.ADMIN)
    createProgressionOnFormation(
        @Param("formationId", CheckObjectIdPipe) formationId: string,
        @Req() req: any
    ) {
        return this.formationService.createProgressionOnFormation(
            formationId,
            req.user._id
        );
    }
}

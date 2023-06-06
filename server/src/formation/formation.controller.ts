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
import { CreateFormationDto } from "./dto/create-formation.dto";
import { UpdateFormationDto } from "./dto/update-formation.dto";
import { FormationService } from "./services/formation.service";

@ApiTags("formations")
@Controller("formations")
export class FormationController {
    constructor(private readonly formationService: FormationService) {}

    @Post()
    //Check role
    create(@Body() createFormationDto: CreateFormationDto, @Req() req: any) {
        return this.formationService.create(createFormationDto);
    }

    @Get()
    //Check role
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

    @Get(":formationId/progression/self")
    getSelfProgressionOnFormation(
        @Param("formationId") formationId: string,
        @Req() req: any
    ) {
        return this.formationService.getUserProgressionOnFormation(
            formationId,
            req.user._id
        );
    }

    @Get(":formationId/progression/:userId")
    getProgressionOfUserOnFormation(
        @Param("formationId") formationId: string,
        @Param("userId") userId: string
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

    @Get("current/:userId")
    getCurrentFormationsOfUser(@Param("userId") userId: string) {
        return this.formationService.getCurrentFormationsOfUser(userId);
    }

    @Post(":formationId/progression")
    createProgressionOnFormation(
        @Param("formationId") formationId: string,
        @Req() req: any
    ) {
        return this.formationService.createProgressionOnFormation(
            formationId,
            req.user._id
        );
    }
}

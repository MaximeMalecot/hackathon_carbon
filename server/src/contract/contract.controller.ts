import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Req,
    UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Types } from "mongoose";
import { Roles } from "src/auth/decorators/roles.decorator";
import { ParseObjectIdPipe } from "src/pipes/objectid.pipe";
import { Role } from "src/users/schemas/user.schema";
import { ContractService } from "./contract.service";
import { CreateContractDto } from "./dto/create-contract.dto";
import { FilterDto } from "./dto/filter.dto";
import { OwnContractsGuards } from "./guards/contracts.guard";
import { StatusPipe } from "./pipes/status.pipe";
import { StatusEnum } from "./schemas/contract.schema";

@ApiTags("contracts")
@Controller("contracts")
export class ContractController {
    constructor(private readonly contractService: ContractService) {}

    @Roles(Role.ASSIGNMENT_EDITOR)
    @Post()
    async create(@Body() createContractDto: CreateContractDto) {
        return await this.contractService.create(createContractDto);
    }

    @Roles(Role.ASSIGNMENT_EDITOR)
    @Patch("cancel/:id")
    cancel(@Param("id", ParseObjectIdPipe) id: string) {
        return this.contractService.updateStatus(id, StatusEnum.CANCELED);
    }

    @Roles(Role.ASSIGNMENT_EDITOR)
    @Patch("finish/:id")
    finish(@Param("id", ParseObjectIdPipe) id: string) {
        return this.contractService.updateStatus(id, StatusEnum.FINISHED);
    }

    @Roles(Role.ASSIGNMENT_EDITOR)
    @Get()
    getAll(@Query() filters?: FilterDto) {
        return this.contractService.findAll(filters);
    }

    @Roles(Role.ASSIGNMENT_EDITOR)
    @Get("user/:id")
    getUserContracts(
        @Param("id", ParseObjectIdPipe) id: Types.ObjectId,
        @Query("status", StatusPipe) status?: StatusEnum
    ) {
        return this.contractService.findForUser(id.toString(), status);
    }

    @Get("self")
    getSelfContracts(@Req() req: any) {
        return this.contractService.findForUser(req.user.id);
    }

    @UseGuards(OwnContractsGuards)
    @Get(":id")
    getOne(@Param("id", ParseObjectIdPipe) id: Types.ObjectId) {
        return this.contractService.findOneWithDelivrables(id);
    }
}

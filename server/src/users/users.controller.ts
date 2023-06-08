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
import { ParseObjectIdPipe } from "src/pipes/objectid.pipe";
import { Role } from "src/users/schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateRolesDto } from "./dto/update-role.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersService } from "./users.service";

@ApiTags("users")
@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Roles(Role.VIEWER)
    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Roles(Role.ACCOUNT_EDITOR)
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get("self")
    findSelf(@Req() req: any) {
        return this.usersService.findOne(req.user.id);
    }

    @Roles(Role.VIEWER)
    @Get(":id")
    findOne(@Param("id", ParseObjectIdPipe) id: string) {
        return this.usersService.findOne(id);
    }

    @Roles(Role.ADMIN)
    @Patch(":id/roles")
    updateRoles(
        @Param("id", ParseObjectIdPipe) id: string,
        @Body() body: UpdateRolesDto
    ) {
        return this.usersService.updateRoles(id, body.roles);
    }

    @Roles(Role.ACCOUNT_EDITOR)
    @Patch(":id")
    update(
        @Param("id", ParseObjectIdPipe) id: string,
        @Body() updateUserDto: UpdateUserDto
    ) {
        return this.usersService.update(id, updateUserDto);
    }

    @Roles(Role.ACCOUNT_EDITOR)
    @Delete(":id")
    remove(@Param("id", ParseObjectIdPipe) id: string) {
        return this.usersService.remove(id);
    }
}

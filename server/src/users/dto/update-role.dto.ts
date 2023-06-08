import { IsEnum } from "class-validator";
import { Role } from "../schemas/user.schema";

export class UpdateRolesDto {
    @IsEnum(Role, { each: true })
    roles: Role[];
}

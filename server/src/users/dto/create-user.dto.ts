import {
    IsArray,
    IsEmail,
    IsOptional,
    IsString,
    IsStrongPassword,
} from "class-validator";
import { Role } from "../schemas/user.schema";

export class CreateUserDto {
    @IsString()
    @IsEmail()
    public email: string;

    @IsString()
    @IsStrongPassword()
    public password: string;

    @IsOptional()
    @IsString()
    public role?: string;

    @IsOptional()
    @IsArray()
    public roles: Array<Role>;
}

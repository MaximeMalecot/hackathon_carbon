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
    public firstName: string;

    @IsString()
    public lastName: string;

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

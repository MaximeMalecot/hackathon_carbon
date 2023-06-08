import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateFormationDto {
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    referent?: string;

    @IsNumber()
    @IsOptional()
    level: number;
}

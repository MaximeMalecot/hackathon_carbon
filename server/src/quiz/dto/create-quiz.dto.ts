import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateQuizDto {
    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsInt()
    level: string;

    @IsString()
    chapterId: string;
}

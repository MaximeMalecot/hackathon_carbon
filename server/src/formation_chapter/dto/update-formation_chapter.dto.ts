import { IsInt, IsOptional, IsString } from "class-validator";

export class UpdateFormationChapterDto {
    @IsInt()
    @IsOptional()
    order: number;

    @IsString()
    resourceId: string;

    @IsString()
    quizId: string;
}

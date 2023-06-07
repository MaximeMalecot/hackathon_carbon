import { IsInt, IsOptional, IsString } from "class-validator";
import { ChapterTypes } from "../schemas/formation_chapter.schema";

export class CreateFormationChapterDto {
    @IsInt()
    @IsOptional()
    order: number;

    @IsString()
    resourceId: string;

    @IsString()
    quizId: string;

    @IsString()
    type: ChapterTypes;
}

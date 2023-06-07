import { IsInt, IsObject, IsOptional, IsString } from "class-validator";
import { CreateQuizDto } from "src/quiz/dto/create-quiz.dto";
import { ChapterTypes } from "../schemas/formation_chapter.schema";

export class ChapterDto {
    @IsInt()
    @IsOptional()
    order: number;

    @IsString()
    type: ChapterTypes;
}

export class CreateResourceDto {}

export class CreateFormationChapterDto {
    @IsObject()
    chapter: ChapterDto;

    @IsObject()
    data: CreateQuizDto | CreateResourceDto;
}

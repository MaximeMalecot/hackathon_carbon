import { IsInt, IsObject, IsOptional, IsString } from "class-validator";
import { CreateQuizDto } from "src/quiz/dto/create-quiz.dto";
import { CreateResourceDto } from "src/resource/dto/create-resource.dto";
import { ChapterTypes } from "../schemas/formation_chapter.schema";

export class ChapterDto {
    @IsInt()
    @IsOptional()
    order: number;

    @IsString()
    type: ChapterTypes;
}

export class CreateResourceChapterDto {
    @IsObject()
    chapter: ChapterDto;

    @IsObject()
    resource: CreateResourceDto;
}

export class CreateQuizChapterDto {
    @IsObject()
    chapter: ChapterDto;

    @IsObject()
    quiz: CreateQuizDto;
}

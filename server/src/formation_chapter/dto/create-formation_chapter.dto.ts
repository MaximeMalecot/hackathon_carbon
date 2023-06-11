import { IsInt, IsObject, IsOptional, IsString } from "class-validator";
import { CreateQuizDto } from "src/quiz/dto/create-quiz.dto";
import { CreateResourceDto } from "src/resource/dto/create-resource.dto";

export class ChapterDto {
    @IsString()
    name: string;

    @IsInt()
    @IsOptional()
    order: number;
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
    quiz: Omit<CreateQuizDto, "chapterId">;
}

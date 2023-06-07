import { IsString } from "class-validator";

export class CreateResourceDto {
    @IsString()
    filePath: string;

    @IsString()
    chapterId: string;
}

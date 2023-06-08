import { IsNumber, IsString, Min } from "class-validator";

export class CreatePostContentDto {
    @IsString()
    data: string;

    @IsNumber()
    @Min(0)
    order: number;
}

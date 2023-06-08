import { IsBoolean, IsString } from "class-validator";

export class CreateAnswerDto {
    @IsString()
    label: string;

    @IsBoolean()
    isCorrect: boolean;
}

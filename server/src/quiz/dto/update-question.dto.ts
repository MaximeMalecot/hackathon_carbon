import { IsArray, IsOptional, IsString } from "class-validator";
import { CreateAnswerDto } from "./create-answer.dto";

export class UpdateQuestionDto {
    @IsString()
    @IsOptional()
    label: string;

    @IsArray()
    @IsOptional()
    answers: Array<CreateAnswerDto>;
}

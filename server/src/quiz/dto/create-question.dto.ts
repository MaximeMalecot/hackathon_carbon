import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { CreateAnswerDto } from "./create-answer.dto";

export class CreateQuestionDto {
    @IsString()
    label: string;

    @IsArray()
    @IsNotEmpty()
    answers: Array<CreateAnswerDto>;
}

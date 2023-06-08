import { IsArray, IsString } from "class-validator";

class Answer {
    questionId: string;
    answers: string[];
}

export class CompleteQuizDto {
    @IsString()
    quizId: string;

    @IsArray()
    answers: Array<Answer>;
}

import { Answer, FORMATION_TYPE } from "../../interfaces";

export interface CreateQuizChapterDto {
    chapter: ChapterDto;
    quiz?: CreateQuizDto;
    resource?: CreateResourceDto;
}
interface ChapterDto {
    name: string;
}
interface CreateQuizDto {
    title: string;
    description: string;
}
interface CreateResourceDto {
    title: string;
    description: string;
    file: File;
}

export interface QuizQuestionDTO {
    label: string;
    quizId: string;
    answers: Answer[];
}

export interface FormationChapterDTO {
    formationId: string;
    name: string;
    order: number;
    type: FORMATION_TYPE;
    _id: string;
}

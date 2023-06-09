export enum FORMATION_TYPE {
    QUIZ = "quiz",
    COURS = "cours",
}

export interface Formation {
    id: number;
    title: string;
    xp: number;
    image: string;
    creator: string;
}

export interface FormationChapters {
    id: string;
    order: number;
    name: string;
    resourceID: object;
    type: FORMATION_TYPE;
}

export interface FormationDTO {
    _id: number;
    name: string;
    referent: string;
    level: number;
}

export interface QuestionQuiz {
    id: string;
    label: string;
    answers: Answer[];
}

export interface Answer {
    id: string;
    label: string;
}

export interface CreateAnswersVM {
    isCorrect: boolean;
    label: string;
}

export interface CreateAnswersDTO {
    label: string;
    answers: CreateAnswersVM[];
}

export interface CreateQuizQuery {
    id: string;
    data: CreateAnswersDTO;
}

export interface SendAnswer {
    questionId: string;
    answers: string[];
}

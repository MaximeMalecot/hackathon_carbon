export enum FORMATION_TYPE {
    QUIZ = "quiz",
    COURS = "cours",
}

export interface Formation {
    id: number;
    title: string;
    description: string;
    xp: number;
    image: string;
    creator: string;
}

export interface FormationChapters {
    id: number;
    order: number;
    name: string;
    resourceID: object;
    type: FORMATION_TYPE;
}

export interface QuestionQuiz {
    id: number;
    label: string;
    answers: Answer[];
}

export interface Answer {
    id: number;
    label: string;
}

export interface SendAnswer {
    questionId: number;
    answers: number[];
}

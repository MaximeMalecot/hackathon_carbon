import {
    Formation,
    FormationChapterDTO,
    FormationChapters,
    FormationDTO,
    QuestionQuiz,
    QuizQuestionDTO,
} from "../interfaces";

export const mapperFormation = (formation: FormationDTO): Formation => {
    return {
        id: formation._id,
        title: formation.name,
        xp: formation.level,
        image: "../../public/images/formation-exemple.jpg",
        creator: formation.referent,
    };
};

export const mapperFormationChapter = (
    formation: FormationChapterDTO
): FormationChapters => {
    return {
        id: formation._id,
        name: formation.name,
        order: formation.order,
        type: formation.type,
        resourceID: {},
    };
};

export const mapperQuizQuestion = (question: QuizQuestionDTO): QuestionQuiz => {
    return {
        id: question._id,
        label: question.label,
        answers: question.answers,
    };
};

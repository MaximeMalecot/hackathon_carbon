import { faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";
import { Command } from "nestjs-command";
import { FormationService } from "src/formation/services/formation.service";
import {
    CreateQuizChapterDto,
    CreateResourceChapterDto,
} from "src/formation_chapter/dto/create-formation_chapter.dto";
import { FormationChapterService } from "src/formation_chapter/formation_chapter.service";
import { CreateQuestionDto } from "src/quiz/dto/create-question.dto";
import { QuizService } from "src/quiz/quiz.service";

@Injectable()
export class FormationSeed {
    constructor(
        private readonly formationService: FormationService,
        private readonly chapterService: FormationChapterService,
        private readonly quizService: QuizService
    ) {}

    @Command({
        command: "db:seed:formations",
        describe: "seed formations",
    })
    async seed() {
        console.log("SEEDING FORMATION -----");
        let formations = [
            {
                name: faker.lorem.word(10),
                level: 200,
            },
            {
                name: faker.lorem.word(10),
                level: 200,
            },
        ];

        for (let formation of formations) {
            const formationCreated = await this.formationService.create(
                formation,
                null
            );

            const chapterDto = {
                name: "Dummy chapter #",
                order: 0,
            };

            const quizChapter = {
                chapter: chapterDto,
                quiz: {
                    title: "Dummy quiz #",
                    description: "Dummy quiz description #",
                    level: 2,
                },
            } as CreateQuizChapterDto;

            const resourceChapter = {
                chapter: chapterDto,
                resource: {
                    filePath:
                        "https://images.unsplash.com/photo-1685885291521-6399f5ffd195?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                    description: "Dummy resource description #",
                    chapterId: "null",
                },
            } as CreateResourceChapterDto;

            const createdQuiz = await this.chapterService.createChapterAndQuiz(
                formationCreated.id,
                quizChapter
            );

            await this.chapterService.createChapterAndResource(
                formationCreated.id,
                resourceChapter
            );

            if (!createdQuiz.quiz) break;

            const questions: CreateQuestionDto[] = [
                {
                    label: "Question A",
                    answers: [
                        {
                            label: "Right answer",
                            isCorrect: true,
                        },
                        {
                            label: "Another right answer",
                            isCorrect: true,
                        },
                        {
                            label: "Wrong answer",
                            isCorrect: false,
                        },
                    ],
                },
                {
                    label: "Question B",
                    answers: [
                        {
                            label: "Right answer",
                            isCorrect: true,
                        },
                        {
                            label: "Wrong answer",
                            isCorrect: false,
                        },
                        {
                            label: "Wrong answer",
                            isCorrect: false,
                        },
                    ],
                },
            ];

            await this.quizService.createQuestions(
                createdQuiz.quiz._id.toString(),
                questions
            );
        }
    }
}

import {
    BadRequestException,
    HttpException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { FormationService } from "src/formation/services/formation.service";
import { CreateQuizDto } from "src/quiz/dto/create-quiz.dto";
import { QuizService } from "src/quiz/quiz.service";
import { ResourceService } from "src/resource/resource.service";
import {
    CreateFormationChapterDto,
    CreateResourceDto,
} from "./dto/create-formation_chapter.dto";
import {
    ChapterTypes,
    FormationChapter,
} from "./schemas/formation_chapter.schema";

@Injectable()
export class FormationChapterService {
    constructor(
        @InjectModel(FormationChapter.name)
        private readonly formationChapterModel: Model<FormationChapter>,
        private readonly formationService: FormationService,
        private readonly quizService: QuizService,
        private readonly resourceService: ResourceService
    ) {}

    async createChapterAndQuiz(
        formationId: string,
        createFormationChapterDto: CreateFormationChapterDto
    ) {
        try {
            const { chapter } = createFormationChapterDto;
            const quiz = createFormationChapterDto.data as CreateQuizDto;

            const newChapter = await this.formationChapterModel.create({
                formationId,
                ...chapter,
            });
            const savedChapter = await newChapter.save();

            const newQuiz = await this.quizService.createQuiz({
                ...quiz,
                chapterId: savedChapter.id,
            });

            return {
                ...savedChapter.toObject(),
                quiz: newQuiz.toObject(),
            };
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) throw err;
            throw new InternalServerErrorException(err.message);
        }
    }

    async createResourceAndQuiz(
        formationId: string,
        createFormationChapterDto: CreateFormationChapterDto
    ) {
        try {
            const { chapter } = createFormationChapterDto;
            const resource =
                createFormationChapterDto.data as CreateResourceDto;

            const newChapter = await this.formationChapterModel.create({
                formationId,
                ...chapter,
            });
            const savedChapter = await newChapter.save();

            const newResource = await this.resourceService.create({
                ...resource,
                chapterId: savedChapter.id,
            });

            return {
                ...savedChapter.toObject(),
                resource: newResource.toObject(),
            };
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) throw err;
            throw new InternalServerErrorException(err.message);
        }
    }

    async create(
        formationId: string,
        createFormationChapterDto: CreateFormationChapterDto
    ) {
        const exists = this.formationService.findOne(formationId);
        if (!exists) {
            throw new BadRequestException("Formation does not exist");
        }

        switch (createFormationChapterDto.chapter.type) {
            case ChapterTypes.QUIZ:
                return await this.createChapterAndQuiz(
                    formationId,
                    createFormationChapterDto
                );

            case ChapterTypes.RESOURCE:
                return await this.createResourceAndQuiz(
                    formationId,
                    createFormationChapterDto
                );

            default:
                throw new BadRequestException("Invalid chapter type");
        }
    }

    async findAllForAFormation(formationId: string) {
        return await this.formationChapterModel.find({ formationId });
    }

    async findOne(chapterId: string) {
        const chapter = await this.formationChapterModel.findById(chapterId);
        if (!chapter) throw new NotFoundException("Chapter does not exist");
        const toReturn = { ...chapter.toObject() };
        let data = null;
        switch (chapter.type) {
            case ChapterTypes.QUIZ:
                data = await this.quizService.findOneByChapterId(chapter.id);
                if (!data) throw new NotFoundException("Quiz does not exist");
                toReturn["quiz"] = data.toObject();
                break;
            case ChapterTypes.RESOURCE:
                data = await this.resourceService.findOneByChapterId(
                    chapter.id
                );
                if (!data)
                    throw new NotFoundException("Resource does not exist");
                toReturn["resource"] = data.toObject();
                break;
        }

        return toReturn;
    }

    async remove(id: string) {
        return await this.formationChapterModel.findByIdAndDelete({
            _id: id,
        });
    }
}

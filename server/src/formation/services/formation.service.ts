import {
    BadRequestException,
    Inject,
    Injectable,
    forwardRef,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { FormationChapterService } from "src/formation_chapter/formation_chapter.service";
import { CreateFormationDto } from "../dto/create-formation.dto";
import { UpdateFormationDto } from "../dto/update-formation.dto";
import { Formation, Level } from "../schemas/formation.schema";
import { FormationProgressionService } from "./progression.service";

@Injectable()
export class FormationService {
    constructor(
        @InjectModel(Formation.name)
        private readonly formationModel: Model<Formation>,
        private readonly progressionService: FormationProgressionService,
        @Inject(forwardRef(() => FormationChapterService))
        private readonly formationChapterService: FormationChapterService
    ) {}

    async create(createFormationDto: CreateFormationDto, userId: string) {
        const existsWithName = await this.formationModel.findOne({
            name: createFormationDto.name,
        });
        if (existsWithName) {
            throw new BadRequestException("Formation name already taken");
        }

        const newFormation = new this.formationModel({
            ...createFormationDto,
            referent: userId,
        });
        return await newFormation.save();
    }

    async findAll() {
        return await this.formationModel.find();
    }

    async findOne(id: string) {
        return await this.formationModel.findById(id);
    }

    async update(id: string, updateFormationDto: UpdateFormationDto) {
        return await this.formationModel.findByIdAndUpdate({
            _id: id,
        });
    }

    async remove(id: string) {
        return await this.formationModel.findByIdAndDelete({
            _id: id,
        });
    }

    async getUserProgressionOnFormation(formationId: string, userId: string) {
        const progression = await this.progressionService.getProgressionOfUser(
            formationId,
            userId
        );

        const formationChapters =
            await this.formationChapterService.findAllForAFormation(
                progression.formationId.toString()
            );

        const progressionPercentage =
            (progression.chaptersDone.length / formationChapters.length) * 100;

        return {
            chaptersDone: progression.chaptersDone,
            progressionPercentage: {
                value: parseFloat(progressionPercentage.toFixed(2)),
                unit: "%",
            },
        };
    }

    async getCurrentFormationsOfUser(userId: string) {
        const formations = await this.progressionService.getAllFormationOfUser(
            userId
        );

        return formations;
    }

    async createProgressionOnFormation(formationId: string, userId: string) {
        return await this.progressionService.createProgressionOnFormation(
            formationId,
            userId
        );
    }

    async createOrUpdateProgressionOnFormation(
        formationId: string,
        userId: string,
        chaptersDone: string
    ) {
        return await this.progressionService.createOrUpdateProgressionOnFormation(
            formationId,
            userId,
            chaptersDone
        );
    }

    async getLevels() {
        return Object.values(Level).filter((level) => !isNaN(Number(level)));
    }
}

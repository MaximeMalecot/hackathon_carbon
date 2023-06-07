import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { FormationService } from "src/formation/services/formation.service";
import { CreateFormationChapterDto } from "./dto/create-formation_chapter.dto";
import { UpdateFormationChapterDto } from "./dto/update-formation_chapter.dto";
import { FormationChapter } from "./schemas/formation_chapter.schema";

@Injectable()
export class FormationChapterService {
    constructor(
        @InjectModel(FormationChapter.name)
        private readonly formationChapterModel: Model<FormationChapter>,
        private readonly formationService: FormationService
    ) {}

    create(
        formationId: string,
        createFormationChapterDto: CreateFormationChapterDto
    ) {
        const exists = this.formationService.findOne(formationId);
        if (!exists) {
            throw new BadRequestException("Formation does not exist");
        }

        const newFormationChapter = new this.formationChapterModel(
            createFormationChapterDto
        );

        return newFormationChapter.save();
    }

    async findAllForAFormation(formationId: string) {
        return await this.formationChapterModel.find({ formationId });
    }

    async findOne(chapterId: string) {
        return await this.formationChapterModel.findById(chapterId);
    }

    async update(
        formationId: string,
        UpdateFormationChapterDto: UpdateFormationChapterDto
    ) {
        return await this.formationChapterModel.findByIdAndUpdate(
            { formationId },
            UpdateFormationChapterDto
        );
    }

    async remove(id: string) {
        return await this.formationChapterModel.findByIdAndDelete({
            _id: id,
        });
    }
}

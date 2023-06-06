import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateFormationDto } from "./dto/create-formation.dto";
import { UpdateFormationDto } from "./dto/update-formation.dto";
import { Formation } from "./entities/formation.schema";

@Injectable()
export class FormationService {
    constructor(
        @InjectModel(Formation.name)
        private readonly formationModel: Model<Formation>
    ) {}

    async create(createFormationDto: CreateFormationDto) {
        const newFormation = new this.formationModel(createFormationDto);
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
}
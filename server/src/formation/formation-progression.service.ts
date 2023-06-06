import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { FormationProgression } from "./entities/formation-progression.schema";

@Injectable()
export class FormationProgressionService {
    constructor(
        @InjectModel(FormationProgression.name)
        private readonly progressionService: Model<FormationProgression>
    ) {}

    private async progressionExists(formationId: string, userId: string) {
        const exists = await this.progressionService.findOne({
            formationId,
            userId,
        });

        if (exists) {
            return true;
        }

        return false;
    }

    async create(formationId: string, userId: string) {
        const exists = await this.progressionExists(formationId, userId);

        if (exists) {
            return;
        }

        const newFormation = new this.progressionService({
            formationId,
            userId,
        });

        return await newFormation.save();
    }

    async getProgression(userId: string, formationId: string) {
        return await this.progressionService.find({
            formationId,
            userId,
        });
    }

    async getCurrentFormationsOfUser(formationsId: string, userId: string) {
        const exists = await this.progressionService.findOne({
            formationsId,
            userId,
        });

        if (!exists) {
            throw new NotFoundException("Formation not found");
        }

        return await this.progressionService.find({
            formationsId,
            userId,
        });
    }
}

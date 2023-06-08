import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { FormationProgression } from "../schemas/formation-progression.schema";

@Injectable()
export class FormationProgressionService {
    constructor(
        @InjectModel(FormationProgression.name)
        private readonly progressionModel: Model<FormationProgression>
    ) {}

    private async progressionExists(params: {
        formationId: string;
        userId: string;
    }): Promise<FormationProgression | false> {
        const exists = await this.progressionModel.findOne({
            formationId: new Types.ObjectId(params.formationId),
            userId: new Types.ObjectId(params.userId),
        });
        if (exists) {
            return exists;
        }
        return false;
    }

    async getAllProgressions() {
        const progression = await this.progressionModel.find();

        if (!progression) {
            throw new NotFoundException("No progression found");
        }

        return progression;
    }

    async getProgressionsOfFormation(formationId: string) {
        const progression = await this.progressionModel.find({
            formationId,
        });

        if (!progression) {
            throw new NotFoundException("No progression found");
        }

        return progression;
    }

    async getAllProgresssionsOfUser(userId: string) {
        const exists = await this.progressionModel.findOne({
            userId,
        });

        if (!exists) {
            throw new NotFoundException("No progression found");
        }

        return await this.progressionModel.find({
            userId,
        });
    }

    async getProgressionOfUser(formationId: string, userId: string) {
        const exists = await this.progressionExists({ formationId, userId });
        if (!exists) {
            throw new NotFoundException("No progression found");
        }
        return exists;
    }

    async getAllFormationOfUser(userId: string) {
        const formations = await this.progressionModel.aggregate([
            {
                $match: {
                    userId: userId,
                },
            },
            {
                $lookup: {
                    from: "formations",
                    localField: "formationId",
                    foreignField: "_id",
                    as: "formation",
                },
            },
            { $unwind: "$formation" },
        ]);
        return formations;
    }

    async createProgressionOnFormation(formationId: string, userId: string) {
        const exists = await this.progressionExists({ formationId, userId });

        if (exists) {
            return;
        }

        const newFormation = new this.progressionModel({
            formationId: new Types.ObjectId(formationId),
            userId,
        });

        return await newFormation.save();
    }

    async createOrUpdateProgressionOnFormation(
        formationId: string,
        userId: string,
        newChapter: string
    ) {
        const progression = await this.progressionModel.findOne({
            formationId: new Types.ObjectId(formationId),
            userId: new Types.ObjectId(userId),
        });

        if (progression) {
            let chaptersDone = new Set([
                ...progression.chaptersDone,
                newChapter,
            ]);
            progression.chaptersDone = Array.from(chaptersDone);
            return await progression.save();
        } else {
            const newProgression = new this.progressionModel({
                formationId: new Types.ObjectId(formationId),
                userId: new Types.ObjectId(userId),
                chaptersDone: [newChapter],
            });

            const savedFormation = await newProgression.save();
            return savedFormation.toObject();
        }
    }
}

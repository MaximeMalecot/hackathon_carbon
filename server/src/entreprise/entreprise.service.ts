import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { unlink } from "fs/promises";
import { Model } from "mongoose";
import { join } from "path";
import { CreateEntrepriseDto } from "./dto/create-entreprise.dto";
import { UpdateEntrepriseDto } from "./dto/update-entreprise.dto";
import { Entreprise } from "./schemas/entreprise.schema";

@Injectable()
export class EntrepriseService {
    constructor(
        @InjectModel(Entreprise.name) private entrepriseModel: Model<Entreprise>
    ) {}

    async createEntreprise(entreprise: CreateEntrepriseDto, imageUrl: string) {
        const createdEntreprise = new this.entrepriseModel({
            ...entreprise,
            image: imageUrl,
        });
        return await createdEntreprise.save();
    }

    async updateEntreprise(
        id: string,
        entrepriseDto: UpdateEntrepriseDto,
        image?: string
    ) {
        const entreprise = await this.entrepriseModel.findById(id);
        if (!entreprise)
            throw new NotFoundException(`Entreprise with id ${id} not found`);
        let data = {};
        if (image && image !== "") {
            data = {
                ...entrepriseDto,
                image: image,
            };
            let imagePath: string = "";
            let imagePathes: string[] = [];
            imagePathes = entreprise.image.split("/") as string[];
            imagePath = imagePathes[imagePathes.length - 1] as string;

            const beforePath = join(
                __dirname,
                "../..",
                `files/entreprise/${imagePath}`
            );
            await unlink(beforePath);
        } else {
            data = {
                ...entrepriseDto,
            };
        }
        return await this.entrepriseModel.findByIdAndUpdate(id, data, {
            new: true,
        });
    }

    async getEntreprises() {
        return await this.entrepriseModel.find().exec();
    }

    async getEntreprise(id: string) {
        return await this.entrepriseModel.findById(id);
    }

    async deleteEntreprise(id: string) {
        const entreprise = await this.entrepriseModel.findById(id);
        if (!entreprise)
            throw new NotFoundException(`Entreprise with id ${id} not found`);
        await this.entrepriseModel.findByIdAndDelete(id);
        return;
    }
}

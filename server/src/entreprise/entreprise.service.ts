import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateEntrepriseDto } from "./dto/create-entreprise.dto";
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

    async getEntreprises() {
        return await this.entrepriseModel.find().exec();
    }
}

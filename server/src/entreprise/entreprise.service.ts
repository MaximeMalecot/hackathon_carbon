import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Entreprise } from "./schemas/entreprise.schema";

@Injectable()
export class EntrepriseService {
    constructor(
        @InjectModel(Entreprise.name) private entrepriseModel: Model<Entreprise>
    ) {}
}

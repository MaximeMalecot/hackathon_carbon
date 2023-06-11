import {
    Inject,
    Injectable,
    NotFoundException,
    forwardRef,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { existsSync } from "fs";
import { unlink } from "fs/promises";
import { Model } from "mongoose";
import { join } from "path";
import { ContractService } from "src/contract/contract.service";
import { CreateEntrepriseDto } from "./dto/create-entreprise.dto";
import { UpdateEntrepriseDto } from "./dto/update-entreprise.dto";
import { Entreprise } from "./schemas/entreprise.schema";

@Injectable()
export class EntrepriseService {
    constructor(
        @InjectModel(Entreprise.name)
        private entrepriseModel: Model<Entreprise>,
        @Inject(forwardRef(() => ContractService))
        private contractService: ContractService
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

            if (existsSync(beforePath)) {
                await unlink(beforePath);
            }
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
        const entreprise = await this.entrepriseModel.findById(id);
        if (!entreprise)
            throw new NotFoundException(`Entreprise with id ${id} not found`);
        const users = await this.contractService.getUsersFromEntreprise(id);
        return {
            entreprise: entreprise,
            users: users,
        };
    }

    async getEntrepriseByUser(id: string) {
        const contracts = await this.contractService.findForUser(id);
        if (!contracts) return [];
        const entreprises = [];
        for (const contract of contracts) {
            const entreprise = await this.entrepriseModel.findById(
                contract.entrepriseId
            );
            if (entreprise) entreprises.push(entreprise);
        }
        return entreprises;
    }

    async deleteEntreprise(id: string) {
        const entreprise = await this.entrepriseModel.findById(id);
        if (!entreprise)
            throw new NotFoundException(`Entreprise with id ${id} not found`);
        await this.entrepriseModel.findByIdAndDelete(id);
        return;
    }

    async clear() {
        const entreprises = await this.entrepriseModel.find();
        for (const entreprise of entreprises) {
            await this.contractService.deleteContractsByEntreprise(
                entreprise.id
            );
            let imagePath: string = "";
            let imagePathes: string[] = [];
            imagePathes = entreprise.image.split("/") as string[];
            imagePath = imagePathes[imagePathes.length - 1] as string;

            const beforePath = join(
                __dirname,
                "../..",
                `files/entreprise/${imagePath}`
            );

            if (existsSync(beforePath)) {
                await unlink(beforePath);
            }
            await this.deleteEntreprise(entreprise._id.toString());
        }
    }
}

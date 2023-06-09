import {
    BadRequestException,
    Inject,
    Injectable,
    InternalServerErrorException,
    forwardRef,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { existsSync } from "fs";
import { unlink } from "fs/promises";
import { Model, Types } from "mongoose";
import { join } from "path";
import { ContractService } from "src/contract/contract.service";
import { Delivrable } from "./schemas/delivrable.schema";

@Injectable()
export class DelivrableService {
    constructor(
        @InjectModel(Delivrable.name)
        private delivrableModel: Model<Delivrable>,
        @Inject(forwardRef(() => ContractService))
        private contractService: ContractService
    ) {}

    async create(contractId: Types.ObjectId, title: string, filePath: string) {
        try {
            const contract = await this.contractService.findOne(contractId);
            if (!contract) throw new BadRequestException("Contract not found");
            const delivrable = new this.delivrableModel({
                title: title,
                file: filePath,
                contractId: contractId,
            });
            return await delivrable.save();
        } catch (err) {
            let imagePath: string = "";
            let imagePathes: string[] = [];
            imagePathes = filePath.split("/") as string[];
            imagePath = imagePathes[imagePathes.length - 1] as string;
            const beforePath = join(
                __dirname,
                "../..",
                `files/delivrables/${imagePath}`
            );
            if (existsSync(beforePath)) {
                await unlink(beforePath);
            }
            throw new InternalServerErrorException(err.message);
        }
    }

    async delete(id: Types.ObjectId) {
        const delivrable = await this.delivrableModel.findById(id);
        if (!delivrable) throw new BadRequestException("Delivrable not found");
        let imagePath: string = "";
        let imagePathes: string[] = [];
        imagePathes = delivrable.file.split("/") as string[];
        imagePath = imagePathes[imagePathes.length - 1] as string;
        const beforePath = join(
            __dirname,
            "../..",
            `files/delivrables/${imagePath}`
        );

        if (existsSync(beforePath)) {
            await unlink(beforePath);
        }
        await this.delivrableModel.deleteOne(id);
        return {
            success: true,
            message: "Delivrable deleted successfully",
        };
    }

    async deleteForContract(contractId: Types.ObjectId) {
        const delivrables = await this.delivrableModel.find({
            contractId: contractId,
        });
        if (!delivrables)
            throw new BadRequestException("Delivrables not found");
        for (let i = 0; i < delivrables.length; i++) {
            let imagePath: string = "";
            let imagePathes: string[] = [];
            imagePathes = delivrables[i].file.split("/") as string[];
            imagePath = imagePathes[imagePathes.length - 1] as string;
            const beforePath = join(
                __dirname,
                "../..",
                `files/delivrables/${imagePath}`
            );

            if (existsSync(beforePath)) {
                await unlink(beforePath);
            }
        }
        await this.delivrableModel.deleteMany({ contractId: contractId });
        return {
            success: true,
            message: "Delivrables deleted successfully",
        };
    }

    async findForContract(contractId: Types.ObjectId) {
        return await this.delivrableModel.find({ contractId: contractId });
    }
}

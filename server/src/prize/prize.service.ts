import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreatePrizeDto } from "./dto/create-prize.dto";
import { Prize } from "./schemas/prize.schema";

@Injectable()
export class PrizeService {
    constructor(@InjectModel(Prize.name) private prizeModel: Model<Prize>) {}

    async create(body: CreatePrizeDto, image: string) {
        const newPrize = new this.prizeModel({ ...body, image });
        return await newPrize.save();
    }

    async findAll() {
        return await this.prizeModel.find();
    }

    async findOne(id: string) {
        const prize = await this.prizeModel.findById(new Types.ObjectId(id));
        if (!prize) {
            throw new NotFoundException("Prize not found");
        }
        return prize;
    }

    async updateStock(id: string, newStock: number) {
        const prize = await this.findOne(id);
        prize.quantity = newStock;
        return await prize.save();
    }
}

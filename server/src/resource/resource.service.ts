import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateResourceDto } from "src/formation_chapter/dto/create-formation_chapter.dto";
import { Resource } from "./schemas/resource.schema";

@Injectable()
export class ResourceService {
    constructor(
        @InjectModel(Resource.name) private resourceModel: Model<Resource>
    ) {}

    create(createResourceDto: CreateResourceDto) {
        const newEmptyResource = new this.resourceModel(createResourceDto);
        return newEmptyResource.save();
    }
}

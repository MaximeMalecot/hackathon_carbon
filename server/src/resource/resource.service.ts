import { Injectable, NotFoundException } from "@nestjs/common";
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

    async findOne(id: string) {
        const resource = this.resourceModel.findById(id).exec();
        if (!resource) throw new NotFoundException("Resource not found");
        return resource;
    }

    async findOneByChapterId(chapterId: string) {
        const resource = this.resourceModel.findOne({ chapterId }).exec();
        if (!resource) throw new NotFoundException("Resource not found");
        return resource;
    }

    async updateResource(resourceId: string, file: string) {
        const resource = this.resourceModel.findById(resourceId).exec();
        if (!resource) throw new NotFoundException("Resource not found");
        return (await resource).updateOne({ file });
    }

    async remove(id: string) {
        const resource = this.resourceModel.findById(id).exec();
        if (!resource) throw new NotFoundException("Resource not found");
        return await this.resourceModel.findByIdAndDelete({
            _id: id,
        });
    }
}

import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateResourceDto } from "./dto/create-resource.dto";
import { Resource } from "./schemas/resource.schema";

@Injectable()
export class ResourceService {
    constructor(
        @InjectModel(Resource.name) private resourceModel: Model<Resource>
    ) {}

    async create(createResourceDto: CreateResourceDto) {
        const newEmptyResource = new this.resourceModel(createResourceDto);
        const savedResource = await newEmptyResource.save();
        if (!savedResource)
            throw new BadRequestException("Resource not created");
        return savedResource;
    }

    async findOne(id: string) {
        const resource = await this.resourceModel.findById(id);
        if (!resource) throw new NotFoundException("Resource not found");
        return resource;
    }

    async findOneByChapterId(chapterId: string) {
        const resource = this.resourceModel.findOne({ chapterId }).exec();
        if (!resource) throw new NotFoundException("Resource not found");
        return resource;
    }

    async updateResource(resourceId: string, filePath: string) {
        const resource = await this.resourceModel.findById(resourceId);
        if (!resource) throw new NotFoundException("Resource not found");
        resource.filePath = filePath;
        return await resource.save();
    }

    async remove(id: string) {
        const resource = this.resourceModel.findById(id).exec();
        if (!resource) throw new NotFoundException("Resource not found");
        return await this.resourceModel.findByIdAndDelete({
            _id: id,
        });
    }
}

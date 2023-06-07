import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ResourceController } from "./resource.controller";
import { ResourceService } from "./resource.service";
import { Resource, ResourceSchema } from "./schemas/resource.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Resource.name, schema: ResourceSchema },
        ]),
    ],
    controllers: [ResourceController],
    providers: [ResourceService],
    exports: [ResourceService],
})
export class ResourceModule {}

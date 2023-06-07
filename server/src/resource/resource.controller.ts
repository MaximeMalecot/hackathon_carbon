import { Body, Controller, Delete, Get, Param, Patch } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ResourceService } from "./resource.service";

@ApiTags("resources")
@Controller("resources")
export class ResourceController {
    constructor(private readonly resourceService: ResourceService) {}

    @Get(":id")
    findOneByChapterId(@Param("id") id: string) {
        return this.resourceService.findOne(id);
    }

    @Patch(":id")
    updateResource(@Param("id") id: string, @Body() file: string) {
        return this.resourceService.updateResource(id, file);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.resourceService.remove(id);
    }
}

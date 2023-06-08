import {
    Controller,
    Delete,
    FileTypeValidator,
    Get,
    MaxFileSizeValidator,
    Param,
    ParseFilePipe,
    Patch,
    Req,
    UploadedFile,
    UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import { diskStorage } from "multer";
import { extname } from "path";
import { Roles } from "src/auth/decorators/roles.decorator";
import { CheckObjectIdPipe } from "src/pipes/checkobjectid.pipe";
import { Role } from "src/users/schemas/user.schema";
import { ResourceService } from "./resource.service";

@ApiTags("resources")
@Controller("resources")
export class ResourceController {
    constructor(private readonly resourceService: ResourceService) {}

    @Get(":id")
    findOneByChapterId(@Param("id", CheckObjectIdPipe) id: string) {
        return this.resourceService.findOne(id);
    }

    @UseInterceptors(
        FileInterceptor("file", {
            storage: diskStorage({
                destination: "./files/formations/chapters/resources",
                filename: (req, file, cb) => {
                    const uniqueSuffix =
                        Date.now() + "-" + Math.round(Math.random() * 1e9);
                    const ext = extname(file.originalname);

                    const filename = uniqueSuffix + ext;
                    cb(null, filename);
                },
            }),
        })
    )
    @Roles(Role.TEACHER)
    @Patch(":id")
    updateResource(
        @Req() req,
        @Param("id", CheckObjectIdPipe) id: string,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new FileTypeValidator({ fileType: ".(pdf)" }),
                    new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
                ],
            })
        )
        file: Express.Multer.File
    ) {
        const filePath = `${req.protocol}://${req.get("Host")}/${file.path}`;
        return this.resourceService.updateResource(id, filePath);
    }

    @Delete(":id")
    remove(@Param("id", CheckObjectIdPipe) id: string) {
        return this.resourceService.remove(id);
    }
}

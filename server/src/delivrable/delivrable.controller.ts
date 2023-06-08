import {
    Body,
    Controller,
    Delete,
    MaxFileSizeValidator,
    Param,
    ParseFilePipe,
    Post,
    Req,
    UploadedFile,
    UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import { Types } from "mongoose";
import { diskStorage } from "multer";
import { extname } from "path";
import { ParseObjectIdPipe } from "src/pipes/objectid.pipe";
import { DelivrableService } from "./delivrable.service";

@ApiTags("delivrables")
@Controller("delivrables")
export class DelivrableController {
    constructor(private delivrableService: DelivrableService) {}

    @UseInterceptors(
        FileInterceptor("file", {
            storage: diskStorage({
                destination: "./files/delivrables",
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
    @Post(":contractId")
    async createDelivrable(
        @Req() req,
        @Param("contractId", ParseObjectIdPipe) contractId: Types.ObjectId,
        @Body("title") title: string,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
                ],
            })
        )
        file: Express.Multer.File
    ) {
        return this.delivrableService.create(
            contractId,
            title,
            `${req.protocol}://${req.get("Host")}/${file.path}`
        );
    }

    @Delete(":id")
    async deleteDelivrable(@Param("id", ParseObjectIdPipe) id: Types.ObjectId) {
        return this.delivrableService.delete(id);
    }
}

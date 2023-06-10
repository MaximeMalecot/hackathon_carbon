import {
    Body,
    Controller,
    FileTypeValidator,
    Get,
    MaxFileSizeValidator,
    Param,
    ParseFilePipe,
    Patch,
    Post,
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
import { CreatePrizeDto } from "./dto/create-prize.dto";
import { PrizeService } from "./prize.service";

@ApiTags("prizes")
@Controller("prizes")
export class PrizeController {
    constructor(private readonly prizeService: PrizeService) {}

    @Get()
    async getPrizes() {
        return this.prizeService.findAll();
    }

    @Get(":id")
    async getPrize(@Param("id", CheckObjectIdPipe) id: string) {
        return this.prizeService.findOne(id);
    }

    @Roles(Role.PRIZE_EDITOR)
    @Patch(":id/out-of-stock")
    async outOfStock(@Param("id", CheckObjectIdPipe) id: string) {
        return this.prizeService.outOfStock(id);
    }

    @UseInterceptors(
        FileInterceptor("file", {
            storage: diskStorage({
                destination: "./files/prizes",
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
    @Roles(Role.PRIZE_EDITOR)
    @Post()
    async createPrize(
        @Req() req,
        @Body() body: CreatePrizeDto,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new FileTypeValidator({ fileType: ".(png|jpeg|jpg)" }),
                    new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
                ],
                fileIsRequired: false,
            })
        )
        file: Express.Multer.File
    ) {
        return this.prizeService.create(
            body,
            `${req.protocol}://${req.get("Host")}/${file.path}`
        );
    }
}

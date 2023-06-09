import {
    Body,
    Controller,
    Delete,
    FileTypeValidator,
    Get,
    MaxFileSizeValidator,
    Param,
    ParseFilePipe,
    Patch,
    Post,
    Req,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import { diskStorage } from "multer";
import { extname } from "path";
import { Roles } from "src/auth/decorators/roles.decorator";
import { CheckObjectIdPipe } from "src/pipes/checkobjectid.pipe";
import { Role } from "src/users/schemas/user.schema";
import { CreateEntrepriseDto } from "./dto/create-entreprise.dto";
import { UpdateEntrepriseDto } from "./dto/update-entreprise.dto";
import { EntrepriseService } from "./entreprise.service";
import { OwnEntrepriseGuards } from "./guards/entreprise.guard";

@ApiTags("entreprises")
@Controller("entreprises")
export class EntrepriseController {
    constructor(private readonly entrepriseService: EntrepriseService) {}

    @UseInterceptors(
        FileInterceptor("file", {
            storage: diskStorage({
                destination: "./files/entreprise",
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
    @Roles(Role.ENTREPRISE_EDITOR)
    @Post()
    async createEntreprise(
        @Req() req,
        @Body() body: CreateEntrepriseDto,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new FileTypeValidator({ fileType: ".(png|jpeg|jpg)" }),
                    new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
                ],
            })
        )
        file: Express.Multer.File
    ) {
        return await this.entrepriseService.createEntreprise(
            body,
            `${req.protocol}://${req.get("Host")}/${file.path}`
        );
    }

    @UseInterceptors(
        FileInterceptor("file", {
            storage: diskStorage({
                destination: "./files/entreprise",
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
    @Roles(Role.ENTREPRISE_EDITOR)
    @Patch(":id")
    async updateEntreprise(
        @Req() req,
        @Param("id", CheckObjectIdPipe) id: string,
        @Body() body: UpdateEntrepriseDto,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new FileTypeValidator({ fileType: ".(png|jpeg|jpg)" }),
                    new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
                ],
                fileIsRequired: false,
            })
        )
        file?: Express.Multer.File
    ) {
        return await this.entrepriseService.updateEntreprise(
            id,
            body,
            file && `${req.protocol}://${req.get("Host")}/${file.path}`
        );
    }
    @Roles(
        Role.ENTREPRISE_EDITOR,
        Role.ASSIGNMENT_EDITOR,
        Role.VIEWER,
        Role.NEWS_EDITOR
    )
    @Get()
    async getEntreprises() {
        return await this.entrepriseService.getEntreprises();
    }

    @Get("self")
    async getEntrepriseByUser(@Req() req) {
        return await this.entrepriseService.getEntrepriseByUser(req.user.id);
    }

    @UseGuards(OwnEntrepriseGuards)
    @Get(":id")
    async getEntreprise(@Param("id", CheckObjectIdPipe) id: string) {
        return await this.entrepriseService.getEntreprise(id);
    }

    @Roles(Role.ADMIN)
    @Delete(":id")
    async deleteEntreprise(@Param("id", CheckObjectIdPipe) id: string) {
        return await this.entrepriseService.deleteEntreprise(id);
    }
}

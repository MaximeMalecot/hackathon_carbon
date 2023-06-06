import {
    Body,
    Controller,
    ParseFilePipeBuilder,
    Post,
    UploadedFile,
    UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Role } from "src/users/schemas/user.schema";
import { CreateEntrepriseDto } from "./dto/create-entreprise.dto";
import { EntrepriseService } from "./entreprise.service";

@Controller("entreprise")
export class EntrepriseController {
    constructor(private readonly entrepriseService: EntrepriseService) {}

    @UseInterceptors(FileInterceptor("file"))
    @Roles(Role.ENTREPRISE_EDITOR)
    @Post()
    async createEntreprise(
        @Body() body: CreateEntrepriseDto,
        @UploadedFile(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({
                    fileType: /(jpg)|(jpeg)|(png)/gm,
                })
                .build()
        )
        file: Express.Multer.File
    ) {
        console.log(file.path);
    }
}

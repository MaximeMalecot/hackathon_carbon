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
    UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import { Types } from "mongoose";
import { diskStorage } from "multer";
import { extname } from "path";
import { Roles } from "src/auth/decorators/roles.decorator";
import { ParseObjectIdPipe } from "src/pipes/objectid.pipe";
import { CreatePostContentDto } from "src/posts-content/dto/post-content.dto";
import { Role } from "src/users/schemas/user.schema";
import { UpdateTextDto } from "./dto/update-text.dto";
import { PostContentService } from "./posts-content.service";
import { ContentType } from "./schema/post-content.schema";

@ApiTags("posts-content")
@Controller("posts-content")
export class PostContentController {
    constructor(private readonly postContentService: PostContentService) {}

    @Get(":postId")
    async getPostContent(
        @Param("postId", ParseObjectIdPipe) postId: Types.ObjectId
    ) {
        return await this.postContentService.findContents(postId);
    }

    @Roles(Role.NEWS_EDITOR)
    @Post(":postId/text")
    async createText(
        @Param("postId") postId: string,
        @Body() body: CreatePostContentDto
    ) {
        return await this.postContentService.addContent(
            postId,
            ContentType.TEXT,
            body
        );
    }

    @Roles(Role.NEWS_EDITOR)
    @UseInterceptors(
        FileInterceptor("file", {
            storage: diskStorage({
                destination: "./files/post",
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
    @Post(":postId/image")
    async createImage(
        @Req() req,
        @Param("postId") postId: string,
        @Body("order") order: number,
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
        return await this.postContentService.addContent(
            postId,
            ContentType.FILE,
            {
                data: `${req.protocol}://${req.get("Host")}/${file.path}`,
                order,
            }
        );
    }

    @Roles(Role.NEWS_EDITOR)
    @UseInterceptors(
        FileInterceptor("file", {
            storage: diskStorage({
                destination: "./files/post",
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
    @Patch(":id/image")
    async updateImageContent(
        @Req() req,
        @Param("id") id: string,
        @Body("order") order?: number,
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
        console.log("onéla");
        return await this.postContentService.updateImage(id, {
            data: `${req.protocol}://${req.get("Host")}/${file.path}`,
            order,
        });
    }

    @Roles(Role.NEWS_EDITOR)
    @Patch(":id/text")
    async updateTextContent(
        @Param("id") id: string,
        @Body() data: UpdateTextDto
    ) {
        return await this.postContentService.updateText(id, data);
    }

    @Roles(Role.NEWS_EDITOR)
    @Delete(":id")
    async deleteContent(@Param("id", ParseObjectIdPipe) id: Types.ObjectId) {
        return await this.postContentService.deleteContent(id);
    }
}

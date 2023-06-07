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
    Query,
    Req,
    UploadedFile,
    UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import { diskStorage } from "multer";
import { extname } from "path";
import { CreatePostDto } from "./dto/create-post.dto";
import { CreatePostContentDto } from "./dto/post-content.dto";
import { PostTypePipe } from "./pipes/post-type.pipe";
import { PostService } from "./posts.service";
import { PostTypes } from "./schemas/post.schema";

@ApiTags("posts")
@Controller("posts")
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Get()
    async getPosts(
        @Req() req: any,
        @Query("type", PostTypePipe) type?: PostTypes
    ) {
        return await this.postService.findAll(req.user, type);
    }

    @Post()
    async createPost(@Req() req: any, @Body() body: CreatePostDto) {
        return await this.postService.create(req.user, body);
    }

    @Patch("addText/:id")
    async addText(
        @Param("id") postId: string,
        @Body() body: CreatePostContentDto
    ) {
        return await this.postService.addContent(postId, "text", body);
    }
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
    @Patch("addImage/:id")
    async addImage(
        @Req() req,
        @Param("id") postId: string,
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
        return await this.postService.addContent(postId, "file", {
            data: `${req.protocol}://${req.get("Host")}/${file.path}`,
            order,
        });
    }
}

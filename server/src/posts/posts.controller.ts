import { Body, Controller, Get, Post, Query, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreatePostDto } from "./dto/create-post.dto";
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
}

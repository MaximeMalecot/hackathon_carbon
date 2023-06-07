import { Controller, Get, Query, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
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
}

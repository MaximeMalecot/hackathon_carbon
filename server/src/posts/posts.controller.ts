import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
    Req,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Types } from "mongoose";
import { Roles } from "src/auth/decorators/roles.decorator";
import { ParseObjectIdPipe } from "src/pipes/objectid.pipe";
import { Role } from "src/users/schemas/user.schema";
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

    @Roles(Role.NEWS_EDITOR)
    @Post()
    async createPost(@Req() req: any, @Body() body: CreatePostDto) {
        return await this.postService.create(req.user, body);
    }

    @Roles(Role.NEWS_EDITOR)
    @Delete(":id")
    async deletePost(@Param("id", ParseObjectIdPipe) id: Types.ObjectId) {
        return await this.postService.delete(id);
    }
}

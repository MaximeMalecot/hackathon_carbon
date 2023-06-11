import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Req,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Types } from "mongoose";
import { Roles } from "src/auth/decorators/roles.decorator";
import { CheckObjectIdPipe } from "src/pipes/checkobjectid.pipe";
import { ParseObjectIdPipe } from "src/pipes/objectid.pipe";
import { Role } from "src/users/schemas/user.schema";
import { CreatePostDto } from "./dto/create-post.dto";
import { FindPostDto } from "./dto/find-post.dto";
import { PostService } from "./posts.service";
import { PostTypes } from "./schemas/post.schema";

@ApiTags("posts")
@Controller("posts")
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Get()
    async getPosts(@Req() req: any, @Query() filters?: FindPostDto) {
        return await this.postService.findAll(req.user, filters);
    }

    @Get("types")
    async getPostTypes() {
        return Object.keys(PostTypes);
    }

    @Get(":id")
    async getPost(@Param("id", CheckObjectIdPipe) id: string) {
        return await this.postService.findOne(id);
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

    @Roles(Role.NEWS_EDITOR)
    @Patch("publish/:id")
    async publishPost(@Param("id", ParseObjectIdPipe) id: Types.ObjectId) {
        return await this.postService.publish(id);
    }
}

import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PostModule } from "src/posts/posts.module";
import { PostContentController } from "./posts-content.controller";
import { PostContentService } from "./posts-content.service";
import { PostContent, PostContentSchema } from "./schema/post-content.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: PostContent.name, schema: PostContentSchema },
        ]),
        PostModule,
    ],
    controllers: [PostContentController],
    providers: [PostContentService],
})
export class PostsContentModule {}

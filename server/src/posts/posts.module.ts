import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ContractModule } from "src/contract/contract.module";
import { PostsContentModule } from "src/posts-content/posts-content.module";
import { PostController } from "./posts.controller";
import { PostService } from "./posts.service";
import { Post, PostSchema } from "./schemas/post.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
        ContractModule,
        forwardRef(() => PostsContentModule),
    ],
    controllers: [PostController],
    providers: [PostService],
    exports: [PostService],
})
export class PostModule {}

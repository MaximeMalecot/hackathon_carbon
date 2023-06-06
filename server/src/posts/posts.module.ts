import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ContractModule } from "src/contract/contract.module";
import { PostController } from "./posts.controller";
import { PostService } from "./posts.service";
import { Post, PostSchema } from "./schemas/post.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
        ContractModule,
    ],
    controllers: [PostController],
    providers: [PostService],
})
export class PostModule {}

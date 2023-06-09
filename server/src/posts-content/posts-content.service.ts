import {
    BadRequestException,
    Inject,
    Injectable,
    forwardRef,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { existsSync } from "fs";
import { unlink } from "fs/promises";
import { Model, Types } from "mongoose";
import { join } from "path";
import { CreatePostContentDto } from "src/posts-content/dto/post-content.dto";
import { PostService } from "src/posts/posts.service";
import { UpdateImageDto } from "./dto/update-image.dto";
import { ContentType, PostContent } from "./schema/post-content.schema";

@Injectable()
export class PostContentService {
    constructor(
        @InjectModel(PostContent.name)
        private postContentModel: Model<PostContent>,
        @Inject(forwardRef(() => PostService))
        private postService: PostService
    ) {}

    async addContent(
        postId: string,
        type: ContentType,
        dto: CreatePostContentDto
    ) {
        const post = await this.postService.findOne(postId);
        if (!post) throw new BadRequestException("Post not found");
        const content = new this.postContentModel({
            type: type,
            data: dto.data,
            order: dto.order,
            postId: post._id,
        });
        return await content.save();
    }

    async updateImage(contentId: string, dto: UpdateImageDto) {
        const content = await this.postContentModel.findById(contentId);
        if (!content) throw new BadRequestException("Content not found");
        if (dto.data) {
            if (content.type === ContentType.FILE) {
                let imagePath: string = "";
                let imagePathes: string[] = [];
                imagePathes = content.data.split("/") as string[];
                imagePath = imagePathes[imagePathes.length - 1] as string;

                const beforePath = join(
                    __dirname,
                    "../..",
                    `files/post/${imagePath}`
                );

                if (existsSync(beforePath)) {
                    await unlink(beforePath);
                }
            }
        }
        return await this.postContentModel.findByIdAndUpdate(
            contentId,
            {
                ...dto,
                type: ContentType.FILE,
            },
            {
                new: true,
            }
        );
    }

    async updateText(contentId: string, dto: UpdateImageDto) {
        const content = await this.postContentModel.findById(contentId);
        if (!content) throw new BadRequestException("Content not found");
        if (dto.data) {
            if (content.type === ContentType.FILE) {
                let imagePath: string = "";
                let imagePathes: string[] = [];
                imagePathes = content.data.split("/") as string[];
                imagePath = imagePathes[imagePathes.length - 1] as string;

                const beforePath = join(
                    __dirname,
                    "../..",
                    `files/post/${imagePath}`
                );

                if (existsSync(beforePath)) {
                    await unlink(beforePath);
                }
            }
        }
        return await this.postContentModel.findByIdAndUpdate(
            contentId,
            {
                ...dto,
                type: ContentType.TEXT,
            },
            {
                new: true,
            }
        );
    }

    async findContents(postId: Types.ObjectId) {
        return await this.postContentModel.find({ postId: postId });
    }

    async deleteContent(contentId: Types.ObjectId) {
        const content = await this.postContentModel.findById(contentId);
        if (!content) throw new BadRequestException("Content not found");
        if (content.type === ContentType.FILE) {
            let imagePath: string = "";
            let imagePathes: string[] = [];
            imagePathes = content.data.split("/") as string[];
            imagePath = imagePathes[imagePathes.length - 1] as string;

            const beforePath = join(
                __dirname,
                "../..",
                `files/post/${imagePath}`
            );

            if (existsSync(beforePath)) {
                await unlink(beforePath);
            }
        }
        return this.postContentModel.deleteOne(content._id);
    }

    async deleteContents(postId: Types.ObjectId) {
        const contents = await this.findContents(postId);
        if (!contents) return;
        for (let i = 0; i < contents.length; i++) {
            this.deleteContent(contents[i].id);
        }
    }
}

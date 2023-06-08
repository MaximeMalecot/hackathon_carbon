import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type PostContentDocument = HydratedDocument<PostContent>;

export enum ContentType {
    TEXT = "text",
    FILE = "file",
}

@Schema()
export class PostContent {
    @Prop({
        type: String,
        required: true,
    })
    type: ContentType;

    @Prop({
        type: String,
        required: true,
    })
    data: string;

    @Prop({
        type: Number,
        required: true,
    })
    order: number;

    @Prop({
        type: Types.ObjectId,
        ref: "post",
    })
    postId: string;
}

export const PostContentSchema = SchemaFactory.createForClass(PostContent);

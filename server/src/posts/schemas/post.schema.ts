import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type PostDocument = HydratedDocument<Post>;

export enum PostTypes {
    "TECHNO" = "TECHNO",
    "INFRA" = "INFRA",
}

export enum PostStatus {
    "DRAFT" = "DRAFT",
    "PUBLISHED" = "PUBLISHED",
}

@Schema()
export class Post {
    @Prop({
        type: String,
        required: true,
    })
    title: string;

    @Prop({
        type: [String],
        default: [],
    })
    types: Array<PostTypes>;

    @Prop({
        type: Types.ObjectId,
        ref: "user",
    })
    writerId: string;

    @Prop({
        type: Types.ObjectId,
        ref: "entreprise",
    })
    entrepriseId: string;

    @Prop({
        type: String,
        enum: PostStatus,
        default: PostStatus.DRAFT,
    })
    status: PostStatus;
}

export const PostSchema = SchemaFactory.createForClass(Post);

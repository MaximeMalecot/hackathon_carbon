import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type PostDocument = HydratedDocument<Post>;

type ContentType = {
    type: "text" | "file";
    data: string;
    order: number;
};

export enum PostTypes {
    "TECHNO" = "TECHNO",
    "INFRA" = "INFRA",
}

@Schema()
export class Post {
    @Prop({
        type: String,
        required: true,
    })
    title: string;

    @Prop({
        type: Array<ContentType>(),
        required: true,
    })
    content: Array<ContentType>;

    @Prop({
        type: [String],
        default: [],
    })
    types: Array<PostTypes>;

    @Prop({
        type: Types.ObjectId,
        ref: "user",
    })
    writer: string;

    @Prop({
        type: Types.ObjectId,
        ref: "entreprise",
    })
    entreprise: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);

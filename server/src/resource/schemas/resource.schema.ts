import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ResourceDocument = HydratedDocument<Resource>;

@Schema()
export class Resource {
    id: string;

    @Prop({
        type: String,
        required: false,
    })
    filePath: string;

    @Prop({
        type: String,
        required: true,
        ref: "formation_chapter",
    })
    chapterId: string;

    @Prop({
        type: Date,
        required: true,
        default: Date.now,
    })
    createdAt: Date;
}

export const ResourceSchema = SchemaFactory.createForClass(Resource);

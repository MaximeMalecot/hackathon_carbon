import { IsArray, IsOptional, IsString } from "class-validator";
import { PostTypes } from "../schemas/post.schema";

export class CreatePostDto {
    @IsString()
    title: string;

    @IsOptional()
    @IsArray()
    types: Array<PostTypes> = [];

    @IsOptional()
    @IsString()
    entrepriseId: string = null;
}

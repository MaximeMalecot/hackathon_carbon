import { IsOptional, IsString } from "class-validator";
import { PaginationDto } from "src/dto/pagination.dto";
import { PostStatus, PostTypes } from "../schemas/post.schema";

export class FindPostDto extends PaginationDto {
    @IsOptional()
    @IsString()
    public search: string;

    @IsOptional()
    @IsString()
    public status: PostStatus;

    @IsOptional()
    @IsString()
    public type: PostTypes;
}

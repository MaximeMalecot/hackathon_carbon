import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { PostTypes } from "../schemas/post.schema";

@Injectable()
export class PostTypePipe implements PipeTransform<any, PostTypes> {
    transform(value: any): PostTypes {
        if (!value) return null;
        if (PostTypes[value] === undefined) {
            throw new BadRequestException("Invalid type");
        }
        return PostTypes[value];
    }
}

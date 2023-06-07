import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { StatusEnum } from "../schemas/contract.schema";

@Injectable()
export class StatusPipe implements PipeTransform<any, StatusEnum> {
    transform(value: any): StatusEnum {
        if (StatusEnum[value] === undefined) {
            throw new BadRequestException("Invalid Status");
        }
        return StatusEnum[value];
    }
}

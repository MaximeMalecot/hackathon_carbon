import { Type } from "class-transformer";
import { IsDate, IsOptional, IsString } from "class-validator";
import { StatusEnum } from "../schemas/contract.schema";

export class FilterDto {
    @IsOptional()
    @IsString()
    position: string;

    @IsOptional()
    @IsString()
    userId: string;

    @IsOptional()
    @IsString()
    entrepriseId: string;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    public startDate: string;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    public endDate: string;

    @IsOptional()
    @IsString()
    status: StatusEnum;
}

import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreatePrizeDto {
    @IsString()
    public name: string;

    @IsOptional()
    @IsString()
    public description?: string;

    @Type(() => Number)
    @IsNumber()
    @Min(1)
    public price: number;

    @Type(() => Number)
    @IsNumber()
    @Min(1)
    public quantity: number;
}

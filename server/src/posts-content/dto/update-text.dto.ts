import { IsNumber, IsOptional, IsString, Min } from "class-validator";

export class UpdateTextDto {
    @IsOptional()
    @IsString()
    data?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    order?: number;
}

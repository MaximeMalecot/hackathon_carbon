import { Type } from "class-transformer";
import { IsDate, IsString } from "class-validator";

export class CreateContractDto {
    @IsString()
    position: string;

    @IsString()
    userId: string;

    @IsString()
    entrepriseId: string;

    @Type(() => Date)
    @IsDate()
    public startDate: string;

    @Type(() => Date)
    @IsDate()
    public endDate: string;
}

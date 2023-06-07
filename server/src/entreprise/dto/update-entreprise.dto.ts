import { IsOptional, IsString } from "class-validator";

export class UpdateEntrepriseDto {
    @IsString()
    @IsOptional()
    public name: string;

    @IsString()
    @IsOptional()
    public address: string;
}

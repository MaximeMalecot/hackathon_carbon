import { IsString } from "class-validator";

export class CreateEntrepriseDto {
    @IsString()
    public name: string;

    @IsString()
    public address: string;
}

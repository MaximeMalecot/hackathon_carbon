import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type EntrepriseDocument = HydratedDocument<Entreprise>;

@Schema()
export class Entreprise {
    @Prop({
        type: String,
        required: true,
    })
    name: string;

    @Prop({
        type: String,
        required: true,
    })
    address: string;

    @Prop({
        type: String,
        required: true,
    })
    image: string;
}

export const EntrepriseSchema = SchemaFactory.createForClass(Entreprise);

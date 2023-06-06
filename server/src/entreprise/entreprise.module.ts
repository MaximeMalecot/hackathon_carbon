import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EntrepriseController } from "./entreprise.controller";
import { EntrepriseService } from "./entreprise.service";
import { Entreprise, EntrepriseSchema } from "./schemas/entreprise.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Entreprise.name, schema: EntrepriseSchema },
        ]),
    ],
    controllers: [EntrepriseController],
    providers: [EntrepriseService],
})
export class EntrepriseModule {}

import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ContractModule } from "src/contract/contract.module";
import { EntrepriseController } from "./entreprise.controller";
import { EntrepriseService } from "./entreprise.service";
import { Entreprise, EntrepriseSchema } from "./schemas/entreprise.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Entreprise.name, schema: EntrepriseSchema },
        ]),
        forwardRef(() => ContractModule),
    ],
    controllers: [EntrepriseController],
    providers: [EntrepriseService],
    exports: [EntrepriseService],
})
export class EntrepriseModule {}

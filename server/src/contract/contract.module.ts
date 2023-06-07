import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DelivrableModule } from "src/delivrable/delivrable.module";
import { EntrepriseModule } from "src/entreprise/entreprise.module";
import { UsersModule } from "src/users/users.module";
import { ContractController } from "./contract.controller";
import { ContractService } from "./contract.service";
import { Contract, ContractSchema } from "./schemas/contract.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Contract.name, schema: ContractSchema },
        ]),
        forwardRef(() => EntrepriseModule),
        UsersModule,
        forwardRef(() => DelivrableModule),
    ],
    controllers: [ContractController],
    providers: [ContractService],
    exports: [ContractService],
})
export class ContractModule {}

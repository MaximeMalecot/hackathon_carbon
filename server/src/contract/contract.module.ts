import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
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
        EntrepriseModule,
        UsersModule,
    ],
    controllers: [ContractController],
    providers: [ContractService],
    exports: [ContractService],
})
export class ContractModule {}

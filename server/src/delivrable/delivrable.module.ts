import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ContractModule } from "src/contract/contract.module";
import { DelivrableController } from "./delivrable.controller";
import { DelivrableService } from "./delivrable.service";
import { Delivrable, DelivrableSchema } from "./schemas/delivrable.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Delivrable.name, schema: DelivrableSchema },
        ]),
        forwardRef(() => ContractModule),
    ],
    controllers: [DelivrableController],
    providers: [DelivrableService],
    exports: [DelivrableService],
})
export class DelivrableModule {}

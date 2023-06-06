import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Formation, FormationSchema } from "./entities/formation.schema";
import { FormationController } from "./formation.controller";
import { FormationService } from "./formation.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Formation.name, schema: FormationSchema },
        ]),
    ],
    controllers: [FormationController],
    providers: [FormationService],
})
export class FormationModule {}

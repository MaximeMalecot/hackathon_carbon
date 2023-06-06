import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
    FormationProgression,
    FormationProgressionSchema,
} from "./entities/formation-progression.schema";
import { Formation, FormationSchema } from "./entities/formation.schema";
import { FormationProgressionService } from "./formation-progression.service";
import { FormationController } from "./formation.controller";
import { FormationService } from "./formation.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Formation.name, schema: FormationSchema },
        ]),
        MongooseModule.forFeature([
            {
                name: FormationProgression.name,
                schema: FormationProgressionSchema,
            },
        ]),
    ],
    controllers: [FormationController],
    providers: [FormationService, FormationProgressionService],
})
export class FormationModule {}

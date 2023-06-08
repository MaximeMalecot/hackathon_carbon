import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FormationChapterModule } from "src/formation_chapter/formation_chapter.module";
import { FormationController } from "./formation.controller";
import {
    FormationProgression,
    FormationProgressionSchema,
} from "./schemas/formation-progression.schema";
import { Formation, FormationSchema } from "./schemas/formation.schema";
import { FormationService } from "./services/formation.service";
import { FormationProgressionService } from "./services/progression.service";

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
        forwardRef(() => FormationChapterModule),
    ],
    controllers: [FormationController],
    providers: [FormationService, FormationProgressionService],
    exports: [FormationService, FormationProgressionService],
})
export class FormationModule {}

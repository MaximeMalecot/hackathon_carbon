import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FormationChapterModule } from "src/formation_chapter/formation_chapter.module";
import { UsersModule } from "src/users/users.module";
import { UsersService } from "src/users/users.service";
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
        MongooseModule.forFeatureAsync([
            {
                name: FormationProgression.name,
                imports: [
                    forwardRef(() => FormationModule),
                    forwardRef(() => UsersModule),
                ],
                useFactory: (
                    formationService: FormationService,
                    usersService: UsersService
                ) => {
                    const schema = FormationProgressionSchema;
                    schema.pre("save", async function () {
                        const progress = this;
                        if (
                            progress.isModified("finished") &&
                            progress.finished !== null
                        ) {
                            const user = progress.userId;
                            const formation = await formationService.findOne(
                                progress.formationId.toString()
                            );
                            if (!formation) return;
                            const { level } = formation;
                            await usersService.addExperience(user, level);
                        }
                    });
                    return schema;
                },
                inject: [FormationService, UsersService],
            },
        ]),
        forwardRef(() => FormationChapterModule),
    ],
    controllers: [FormationController],
    providers: [FormationService, FormationProgressionService],
    exports: [FormationService, FormationProgressionService],
})
export class FormationModule {}

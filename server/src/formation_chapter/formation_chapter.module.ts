import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FormationModule } from "src/formation/formation.module";
import { FormationChapterController } from "./formation_chapter.controller";
import { FormationChapterService } from "./formation_chapter.service";
import {
    FormationChapter,
    FormationChapterSchema,
} from "./schemas/formation_chapter.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: FormationChapter.name, schema: FormationChapterSchema },
        ]),
        FormationModule,
    ],
    controllers: [FormationChapterController],
    providers: [FormationChapterService],
})
export class FormationChapterModule {}

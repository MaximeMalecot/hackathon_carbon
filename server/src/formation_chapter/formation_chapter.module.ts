import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FormationModule } from "src/formation/formation.module";
import { QuizModule } from "src/quiz/quiz.module";
import { ResourceModule } from "src/resource/resource.module";
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
        forwardRef(() => FormationModule),
        QuizModule,
        ResourceModule,
    ],
    controllers: [FormationChapterController],
    providers: [FormationChapterService],
    exports: [FormationChapterService],
})
export class FormationChapterModule {}

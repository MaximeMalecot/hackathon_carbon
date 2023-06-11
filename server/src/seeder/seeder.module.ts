import { Module } from "@nestjs/common";
import { EntrepriseModule } from "src/entreprise/entreprise.module";
import { FormationModule } from "src/formation/formation.module";
import { FormationChapterModule } from "src/formation_chapter/formation_chapter.module";
import { PostsContentModule } from "src/posts-content/posts-content.module";
import { PostModule } from "src/posts/posts.module";
import { PrizeModule } from "src/prize/prize.module";
import { QuizModule } from "src/quiz/quiz.module";
import { UsersModule } from "src/users/users.module";
import { ClearCommand } from "./clear.command";
import { SeedCommand } from "./seed.command";
import { EntrepriseSeed } from "./seeds/entreprise.seed";
import { FormationSeed } from "./seeds/formation";
import { PostSeed } from "./seeds/posts.seed";
import { PrizeSeed } from "./seeds/prize.seed";
import { UserSeed } from "./seeds/user.seed";

@Module({
    imports: [
        UsersModule,
        PostModule,
        PostsContentModule,
        EntrepriseModule,
        PrizeModule,
        FormationModule,
        FormationChapterModule,
        QuizModule,
    ],
    providers: [
        ClearCommand,
        UserSeed,
        SeedCommand,
        EntrepriseSeed,
        PostSeed,
        PrizeSeed,
        FormationSeed,
    ],
    exports: [SeedCommand, ClearCommand],
})
export class SeederModule {}

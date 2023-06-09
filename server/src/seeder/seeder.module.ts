import { Module } from "@nestjs/common";
import { EntrepriseModule } from "src/entreprise/entreprise.module";
import { PostsContentModule } from "src/posts-content/posts-content.module";
import { PostModule } from "src/posts/posts.module";
import { UsersModule } from "src/users/users.module";
import { ClearCommand } from "./clear.command";
import { SeedCommand } from "./seed.command";
import { EntrepriseSeed } from "./seeds/entreprise.seed";
import { PostSeed } from "./seeds/posts.seed";
import { UserSeed } from "./seeds/user.seed";

@Module({
    imports: [UsersModule, PostModule, PostsContentModule, EntrepriseModule],
    providers: [ClearCommand, UserSeed, SeedCommand, EntrepriseSeed, PostSeed],
    exports: [SeedCommand, ClearCommand],
})
export class SeederModule {}

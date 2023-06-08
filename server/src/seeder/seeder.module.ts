import { Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { ClearCommand } from "./clear.command";
import { SeedCommand } from "./seed.command";
import { UserSeed } from "./seeds/user.seed";

@Module({
    imports: [UsersModule],
    providers: [ClearCommand, UserSeed, SeedCommand],
    exports: [SeedCommand, ClearCommand],
})
export class SeederModule {}

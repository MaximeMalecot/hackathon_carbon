import { Injectable } from "@nestjs/common";
import { Command } from "nestjs-command";
import { EntrepriseSeed } from "./seeds/entreprise.seed";
import { PostSeed } from "./seeds/posts.seed";
import { PrizeSeed } from "./seeds/prize.seed";
import { UserSeed } from "./seeds/user.seed";

@Injectable()
export class SeedCommand {
    constructor(
        private readonly userSeeder: UserSeed,
        private readonly entrepriseSeeder: EntrepriseSeed,
        private readonly postSeeder: PostSeed,
        private readonly prizeSeeder: PrizeSeed
    ) {}

    @Command({
        command: "db:seed",
        describe: "seed",
    })
    async seed() {
        await this.userSeeder.seed();
        await this.entrepriseSeeder.seed();
        await this.postSeeder.seed();
        await this.prizeSeeder.seed();
    }
}

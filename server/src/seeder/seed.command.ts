import { Injectable } from "@nestjs/common";
import { Command } from "nestjs-command";
import { UserSeed } from "./seeds/user.seed";

@Injectable()
export class SeedCommand {
    constructor(private readonly userSeeder: UserSeed) {}

    @Command({
        command: "db:seed",
        describe: "seed",
    })
    async seed() {
        await this.userSeeder.seed();
    }
}

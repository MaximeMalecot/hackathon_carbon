import { Injectable } from "@nestjs/common";
import { Command } from "nestjs-command";
import { UsersService } from "src/users/users.service";

@Injectable()
export class ClearCommand {
    constructor(private readonly usersService: UsersService) {}

    @Command({
        command: "db:clear",
        describe: "clear",
    })
    async seed() {
        await this.usersService.clear();
    }
}

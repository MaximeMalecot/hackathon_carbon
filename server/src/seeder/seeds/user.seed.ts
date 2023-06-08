import { Injectable } from "@nestjs/common";
import { Command } from "nestjs-command";
import { EASY_ROLES, Role } from "src/users/schemas/user.schema";
import { UsersService } from "../../users/users.service";

@Injectable()
export class UserSeed {
    constructor(private readonly usersService: UsersService) {}

    @Command({
        command: "db:seed:user",
        describe: "seed users",
    })
    async seed() {
        console.log("SEEDING USERS -----");
        await this.usersService.clear();
        let user = {
            email: "user@user.com",
            password: "User123+",
            roles: [],
        };
        let admin = {
            email: "admin@admin.com",
            password: "Admin123+",
            roles: ["ADMIN"],
        };
        let rh = {
            email: "rh@rh.com",
            password: "User123+",
            roles: EASY_ROLES.RH,
        };
        let commercial = {
            email: "commercial@commercial.com",
            password: "User123+",
            roles: EASY_ROLES.COMMERCIAL,
        };
        let viewer = {
            email: "viewer@viewer.com",
            password: "User123+",
            roles: [Role.VIEWER],
        };
        let teacher = {
            email: "teacher@teacher.com",
            password: "User123+",
            roles: [Role.TEACHER],
        };
        const defaultPwd = "User123+";

        let usersData = [user, admin, rh, commercial, viewer, teacher];
        for (let i = 0; i < usersData.length; i++) {
            let tmpUser = await this.usersService.create(usersData[i]);
            console.log(`Created user with id: ${tmpUser.id}`);
        }
        for (let i = 0; i < 5; i++) {
            const data = {
                email: `user${i}@user.com`,
                password: defaultPwd,
                roles: [],
            };
            let tmpUser = await this.usersService.create(data);
            await tmpUser.save();
            console.log(`Created user with id: ${tmpUser.id}`);
        }
    }
}

import { Controller, Post } from "@nestjs/common";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Role } from "src/users/schemas/user.schema";
import { EntrepriseService } from "./entreprise.service";

@Controller("entreprise")
export class EntrepriseController {
    constructor(private readonly entrepriseService: EntrepriseService) {}

    @Roles(Role.ADMIN)
    @Post()
    async createEntreprise() {}
}

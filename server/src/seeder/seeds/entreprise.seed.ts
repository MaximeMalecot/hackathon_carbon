import { Injectable } from "@nestjs/common";
import { Command } from "nestjs-command";
import { EntrepriseService } from "src/entreprise/entreprise.service";

@Injectable()
export class EntrepriseSeed {
    constructor(private readonly entrepriseService: EntrepriseService) {}

    @Command({
        command: "db:seed:posts",
        describe: "seed posts",
    })
    async seed() {
        console.log("SEEDING ENTREPRISES -----");
        await this.entrepriseService.clear();
        const entreprises = [
            {
                dto: {
                    name: "Carbon IT",
                    address: "1 rue de la paix",
                },
                imageUrl:
                    "https://carbon-it.fr/wp-content/uploads/2020/11/cropped-android-chrome-192x192-1.png",
            },
            {
                dto: {
                    name: "Carbon IT 2",
                    address: "2 rue de la paix",
                },
                imageUrl:
                    "https://carbon-it.fr/wp-content/uploads/2020/11/cropped-android-chrome-192x192-1.png",
            },
        ];
        const dbEntreprises = [];
        for (let entreprise of entreprises) {
            const dbEntreprise = await this.entrepriseService.createEntreprise(
                entreprise.dto,
                entreprise.imageUrl
            );
            console.log(`Created entreprise with id: ${dbEntreprise._id}`);
            dbEntreprises.push(dbEntreprise);
        }
    }
}

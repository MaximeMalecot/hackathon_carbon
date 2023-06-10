import { Injectable } from "@nestjs/common";
import { Command } from "nestjs-command";
import { PrizeService } from "src/prize/prize.service";

@Injectable()
export class PrizeSeed {
    constructor(private readonly prizeService: PrizeService) {}

    @Command({
        command: "db:seed:prizes",
        describe: "seed prizes",
    })
    async seed() {
        console.log("SEEDING PRIZES -----");
        await this.prizeService.clear();
        let prizes = [
            {
                image: "https://cdn.educba.com/academy/wp-content/uploads/2020/06/StarUML.jpg",
                dto: {
                    name: "Prize 1",
                    description: "Description 1",
                    price: 10,
                    quantity: 10,
                },
            },
            {
                image: "https://cdn.educba.com/academy/wp-content/uploads/2020/06/StarUML.jpg",
                dto: {
                    name: "Prize 2",
                    description: "Description 2",
                    price: 15,
                    quantity: 2,
                },
            },
        ];

        for (let prize of prizes) {
            const dbPrize = await this.prizeService.create(
                prize.dto,
                prize.image
            );
            console.log(`Created prize with id: ${dbPrize._id}`);
        }
    }
}

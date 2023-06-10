import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PrizeController } from "./prize.controller";
import { PrizeService } from "./prize.service";
import { Prize, PrizeSchema } from "./schemas/prize.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Prize.name, schema: PrizeSchema }]),
    ],
    controllers: [PrizeController],
    providers: [PrizeService],
    exports: [PrizeService],
})
export class PrizeModule {}

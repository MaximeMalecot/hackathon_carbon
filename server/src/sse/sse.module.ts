import { Module } from "@nestjs/common";
import { ContractModule } from "src/contract/contract.module";
import { SseController } from "./sse.controller";
import { SseService } from "./sse.service";

@Module({
    imports: [ContractModule],
    controllers: [SseController],
    providers: [SseService],
    exports: [SseService],
})
export class SseModule {}

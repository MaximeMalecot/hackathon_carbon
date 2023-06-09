import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Roles } from "src/auth/decorators/roles.decorator";
import { CheckObjectIdPipe } from "src/pipes/checkobjectid.pipe";
import { Role } from "src/users/schemas/user.schema";
import { TransactionService } from "./transaction.service";

@ApiTags("transactions")
@Controller("transactions")
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @Post()
    async createTransaction(
        @Req() req: any,
        @Body("prizeId", CheckObjectIdPipe) body: string
    ) {
        return this.transactionService.create(req.user.id, body);
    }

    @Get("/self")
    async getSelfTransactions(@Req() req: any) {
        return this.transactionService.findAllForUser(req.user.id);
    }

    @Roles(Role.PRIZE_EDITOR)
    @Get(":id")
    async getTransaction(@Param("id", CheckObjectIdPipe) id: string) {
        return this.transactionService.findAllForUser(id);
    }
}

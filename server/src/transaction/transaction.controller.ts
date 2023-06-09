import { Controller, Get, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { TransactionService } from "./transaction.service";

@ApiTags("transactions")
@Controller("transactions")
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @Get("/self")
    async getSelfTransactions(@Req() req: any) {
        return this.transactionService.findAllForUser(req.user.id);
    }
}

import {
    CanActivate,
    ExecutionContext,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import { Role } from "src/users/schemas/user.schema";
import { ContractService } from "../contract.service";

@Injectable()
export class OwnContractsGuards implements CanActivate {
    constructor(private contractService: ContractService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const { user } = context.switchToHttp().getRequest();
        if (!user) throw new UnauthorizedException();
        const { id } = context.switchToHttp().getRequest().params;
        const requestedContract = await this.contractService.findOne(id);
        if (!requestedContract) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return (
            requestedContract.userId === user.id ||
            user.roles.includes(Role.ASSIGNMENT_EDITOR) ||
            user.roles.includes(Role.ADMIN)
        );
    }
}

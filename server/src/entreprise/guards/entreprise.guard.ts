import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { ContractService } from "src/contract/contract.service";
import { Role } from "src/users/schemas/user.schema";

@Injectable()
export class OwnEntrepriseGuards implements CanActivate {
    constructor(private contractService: ContractService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const { user } = context.switchToHttp().getRequest();
        if (!user) throw new UnauthorizedException();
        const { id } = context.switchToHttp().getRequest().params;
        const isUserInEntreprise =
            await this.contractService.isUserInEntreprise(user.id, id);
        console.log(isUserInEntreprise);
        return (
            isUserInEntreprise ||
            [
                Role.ENTREPRISE_EDITOR,
                Role.ASSIGNMENT_EDITOR,
                Role.VIEWER,
                Role.ADMIN,
            ].some((role) => user.roles.includes(role))
        );
    }
}

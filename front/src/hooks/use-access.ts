import { ROLES } from "../constants";
import { useAuthContext } from "../contexts/auth.context";

export function useAccess() {
    const { data } = useAuthContext();

    const hasAccess = (roles: Array<ROLES>) => {
        if (!data) return false;
        if (data.roles.includes(ROLES.ADMIN)) return true;
        return roles.some((role) => data?.roles.includes(role));
    };

    return { hasAccess };
}

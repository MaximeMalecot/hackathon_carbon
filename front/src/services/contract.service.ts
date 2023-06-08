import { API_ENDPOINT } from "../constants";
import authHeader from "./auth.header";

class ContractService {
    async getSelfContract() {
        const res = await fetch(`${API_ENDPOINT}/contracts/self`, {
            method: "GET",
            headers: {
                ...authHeader(),
            },
        });
        return await res.json();
    }
}

export default new ContractService();

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

    async getAll() {
        const res = await fetch(`${API_ENDPOINT}/contracts`, {
            method: "GET",
            headers: {
                ...authHeader(),
            },
        });
        return await res.json();
    }
}

export default new ContractService();

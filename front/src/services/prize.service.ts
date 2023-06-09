import { API_ENDPOINT } from "../constants";
import authHeader from "./auth.header";

class PrizeService {
    async getAll() {
        const res = await fetch(`${API_ENDPOINT}/prizes`, {
            method: "GET",
            headers: {
                ...authHeader(),
            },
        });
        if (!res.ok) throw new Error("Error while fetching prizes");
        return await res.json();
    }

    async getOne(id: string) {
        const res = await fetch(`${API_ENDPOINT}/prizes/${id}`, {
            method: "GET",
            headers: {
                ...authHeader(),
            },
        });
        if (!res.ok) throw new Error("Error while fetching prize");
        return await res.json();
    }

    async buyPrize(prizeId: string) {
        const res = await fetch(`${API_ENDPOINT}/transactions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...authHeader(),
            },
            body: JSON.stringify({ prizeId }),
        });
        if (res.status === 500) throw new Error("Error while fetching prize");
        return await res.json();
    }

    async clearStock(prizeId: string) {
        const res = await fetch(
            `${API_ENDPOINT}/prizes/${prizeId}/out-of-stock`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    ...authHeader(),
                },
            }
        );
        if (res.status === 500)
            throw new Error("Error while reducing prize stock");
        return await res.json();
    }
}

export default new PrizeService();

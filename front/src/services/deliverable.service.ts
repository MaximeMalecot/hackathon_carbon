import { API_ENDPOINT } from "../constants/endpoints";
import authHeader from "./auth.header";

class DeliverableService {
    async create(contractId: string, file: any, title: string) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);

        const res = await fetch(`${API_ENDPOINT}/delivrables/${contractId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: formData,
        });

        return await res.json();
    }

    async delete(deliverableId: string) {
        const res = await fetch(
            `${API_ENDPOINT}/delivrables/${deliverableId}`,
            {
                method: "DELETE",
                headers: {
                    ...authHeader(),
                },
            }
        );

        if (res.ok) {
            return true;
        } else {
            return false;
        }
    }
}

export default new DeliverableService();

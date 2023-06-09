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
                ...authHeader(),
            },
            body: formData,
        });

        if (res.ok) {
            return true;
        }

        if (res.status === 500) {
            throw new Error();
        }

        throw new Error((await res.json())?.message ?? "Unknown error");
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

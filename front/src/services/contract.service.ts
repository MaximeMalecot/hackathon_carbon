import { toast } from "react-toastify";
import { API_ENDPOINT } from "../constants";
import { CreateContractDto } from "../interfaces";
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

    async getOne(contractId: string) {
        const res = await fetch(`${API_ENDPOINT}/contracts/${contractId}`, {
            method: "GET",
            headers: {
                ...authHeader(),
            },
        });
        return await res.json();
    }

    async cancelContract(contractId: string) {
        const res = await fetch(
            `${API_ENDPOINT}/contracts/cancel/${contractId}`,
            {
                method: "PATCH",
                headers: {
                    ...authHeader(),
                },
            }
        );

        if (res.status === 200) {
            return true;
        } else {
            return false;
        }
    }

    async createContract(contract: CreateContractDto) {
        const res = await fetch(`${API_ENDPOINT}/contracts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...authHeader(),
            },
            body: JSON.stringify(contract),
        });

        const data = await res.json();

        if (!res.ok) {
            toast.error(data.message);
            return false;
        }
        toast.success("Contrat créé avec succès");
        return data;
    }

    async finishContract(contractId: string) {
        const res = await fetch(
            `${API_ENDPOINT}/contracts/finish/${contractId}`,
            {
                method: "PATCH",
                headers: {
                    ...authHeader(),
                },
            }
        );

        if (res.status === 200) {
            return true;
        } else {
            return false;
        }
    }
}

export default new ContractService();

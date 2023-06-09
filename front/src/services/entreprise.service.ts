import { toast } from "react-toastify";
import { API_ENDPOINT } from "../constants/endpoints";
import authHeader from "./auth.header";

class EntrepriseService {
    async getAll() {
        try {
            const res = await fetch(`${API_ENDPOINT}/entreprises`, {
                method: "GET",
                headers: {
                    ...authHeader(),
                },
            });
            return await res.json();
        } catch (e) {
            toast.error("Error :" + e, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    }

    async getContractByEntrepriseId(id: string | undefined) {
        try {
            const res = await fetch(
                `${API_ENDPOINT}/contracts?entrepriseId=${id}`,
                {
                    method: "GET",
                    headers: {
                        ...authHeader(),
                    },
                }
            );
            return await res.json();
        } catch (e) {
            toast.error("Error :" + e, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    }

    async getById(id: string | undefined) {
        try {
            const res = await fetch(`${API_ENDPOINT}/entreprises/${id}`, {
                method: "GET",
                headers: {
                    ...authHeader(),
                },
            });
            return await res.json();
        } catch (e) {
            toast.error("Error :" + e, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    }
    async create(name: string, address: string, file: any) {
        const data = new FormData();
        data.append("name", name);
        data.append("address", address);
        data.append("file", file);
        try {
            const res = await fetch(`${API_ENDPOINT}/entreprises`, {
                method: "POST",
                headers: {
                    ...authHeader(),
                },
                body: data,
            });
            if (res.ok) {
                toast.success("L'entreprise a bien été créée !", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            } else {
                toast.error("Erreur: " + res.statusText, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
            return await res.json();
        } catch (e) {
            toast.error("Error :" + e, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    }

    async register(email: string, password: string) {
        const res = await fetch(`${API_ENDPOINT}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        return await res.json();
    }

    async getOne(entrepriseId: string) {
        const res = await fetch(`${API_ENDPOINT}/entreprises/${entrepriseId}`, {
            method: "GET",
            headers: {
                ...authHeader(),
            },
        });

        if (!res.ok) {
            throw new Error("Entreprise not found");
        }
        return await res.json();
    }
}

export default new EntrepriseService();

import { toast } from "react-toastify";
import { API_ENDPOINT } from "../constants/endpoints";
import authHeader from "./auth.header";

class EntrepriseService {
    async getAll() {
        try {
            const res = await fetch(`${API_ENDPOINT}/entreprise`, {
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
            const res = await fetch(`${API_ENDPOINT}/entreprise`, {
                method: "POST",
                headers: {
                    ...authHeader(),
                },
                body: data,
            });
            console.log(res);
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
}

export default new EntrepriseService();

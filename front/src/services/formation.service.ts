import { toast } from "react-toastify";
import { API_ENDPOINT } from "../constants/endpoints";
import { FormationDTO } from "../interfaces";
import authHeader from "./auth.header";

class FormationService {
    async createFormation(name: string) {
        try {
            const res = await fetch(`${API_ENDPOINT}/formations`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...authHeader(),
                },
                body: JSON.stringify({
                    name,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("La formation a bien été créée !", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            } else {
                toast.error("Erreur: " + data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }

            return data;
        } catch (e: any) {
            toast.error("Error :" + e, {
                position: toast.POSITION.TOP_LEFT,
            });
        }
    }

    async getFormations(): Promise<FormationDTO[] | null> {
        try {
            const res = await fetch(`${API_ENDPOINT}/formations`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...authHeader(),
                },
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error("Erreur: " + data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                });
                return null;
            }

            return data;
        } catch (e: any) {
            toast.error("Error :" + e, {
                position: toast.POSITION.TOP_LEFT,
            });
        }
        return null;
    }
}

export default new FormationService();

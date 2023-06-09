import { toast } from "react-toastify";
import { API_ENDPOINT } from "../constants/endpoints";
import authHeader from "./auth.header";
class PostService {
    async getAllPublic() {
        try {
            const res = await fetch(`${API_ENDPOINT}/posts?status=PUBLISHED`, {
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
    async getAll() {
        try {
            const res = await fetch(`${API_ENDPOINT}/posts`, {
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
    async getAllTypes() {
        try {
            const res = await fetch(`${API_ENDPOINT}/posts/types`, {
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

    async getAllEntreprises() {
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

    async create(title: string, types: Array<string>, entrepriseId: string) {
        try {
            const body = {
                title,
            } as any;
            if (entrepriseId && entrepriseId !== "") {
                body.entrepriseId = entrepriseId;
            }
            if (types && types.length > 0) {
                body.types = types;
            }
            const res = await fetch(`${API_ENDPOINT}/posts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...authHeader(),
                },
                body: JSON.stringify(body),
            });
            if (res.ok) {
                toast.success("Le post a bien été créée !", {
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
}

export default new PostService();

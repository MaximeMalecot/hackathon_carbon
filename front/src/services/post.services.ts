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
                position: toast.POSITION.BOTTOM_RIGHT,
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
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    }

    async getPostContentByPostId(id: string | undefined) {
        try {
            const res = await fetch(`${API_ENDPOINT}/posts-content/${id}`, {
                method: "GET",
                headers: {
                    ...authHeader(),
                },
            });
            return await res.json();
        } catch (e) {
            toast.error("Error :" + e, {
                position: toast.POSITION.BOTTOM_RIGHT,
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
                position: toast.POSITION.BOTTOM_RIGHT,
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
                position: toast.POSITION.BOTTOM_RIGHT,
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
                toast.success("Le post a bien été créée !");
            } else {
                toast.error("Erreur: " + res.statusText);
            }
            return await res.json();
        } catch (e) {
            toast.error("Error :" + e, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    }

    async publish(postId: string) {
        try {
            const res = await fetch(`${API_ENDPOINT}/posts/publish/${postId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    ...authHeader(),
                },
            });
            if (res.ok) {
                toast.success("Le post a bien été publié !");
            } else {
                toast.error("Erreur: " + res.statusText);
            }
            return await res.json();
        } catch (e) {
            toast.error("Error :" + e, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    }

    async getOne(postId: string) {
        try {
            const res = await fetch(`${API_ENDPOINT}/posts/${postId}`, {
                method: "GET",
                headers: {
                    ...authHeader(),
                },
            });
            if (res.ok) return await res.json();
            return null;
        } catch (e) {
            toast.error("Error :" + e, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            return null;
        }
    }

    async getContents(postId: string) {
        const res = await fetch(`${API_ENDPOINT}/posts-content/${postId}`, {
            method: "GET",
            headers: {
                ...authHeader(),
            },
        });
        return await res.json();
    }
}

export default new PostService();

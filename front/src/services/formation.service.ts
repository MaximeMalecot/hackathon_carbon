import { toast } from "react-toastify";
import { API_ENDPOINT } from "../constants/endpoints";
import { CreateQuizChapterDto, FormationDTO } from "../interfaces";
import authHeader from "./auth.header";
interface CreateFormationQuery {
    name: string;
    level: number;
}

interface CreateChapterQuery {
    id: string;
    data: CreateQuizChapterDto;
}
class FormationService {
    async createFormation(formData: CreateFormationQuery) {
        try {
            const res = await fetch(`${API_ENDPOINT}/formations`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...authHeader(),
                },
                body: JSON.stringify(formData),
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

    async createChapterQuiz({ id, data }: CreateChapterQuery) {
        try {
            const res = await fetch(
                `${API_ENDPOINT}/formation-chapter/${id}/quiz`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        ...authHeader(),
                    },
                    body: JSON.stringify(data),
                }
            );

            const response = await res.json();

            if (res.ok) {
                toast.success("Le quiz a bien été créée !", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            } else {
                toast.error("Erreur: " + response.message, {
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

    async createChapterResource({ id, data }: CreateChapterQuery) {
        try {
            const res = await fetch(
                `${API_ENDPOINT}/formation-chapter/${id}/resource`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        ...authHeader(),
                    },
                    body: JSON.stringify(data),
                }
            );

            const response = await res.json();

            if (res.ok) {
                toast.success("La ressource a bien été créée !", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            } else {
                toast.error("Erreur: " + response.message, {
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

    async getFormationChapters(id: string) {
        try {
            const res = await fetch(
                `${API_ENDPOINT}/formation-chapter/formation/${id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        ...authHeader(),
                    },
                }
            );

            const response = await res.json();

            if (res.ok) {
                return response;
            } else {
                toast.error("Erreur: " + response.message, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }

            return response;
        } catch (e: any) {
            toast.error("Error :" + e, {
                position: toast.POSITION.TOP_LEFT,
            });
        }
    }
}

export default new FormationService();

import { toast } from "react-toastify";
import { API_ENDPOINT } from "../constants/endpoints";
import { mapperFormation } from "../helpers";
import {
    CreateQuizChapterDto,
    Formation,
    FormationDTO,
    QuestionQuiz,
} from "../interfaces";
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
                toast.success("La formation a bien été créée !");
            } else {
                toast.error("Erreur: " + data.message);
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
                toast.error("Erreur: " + data.message);
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
                toast.success("Le quiz a bien été créé !");
            } else {
                toast.error("Erreur: " + response.message);
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
                toast.success("La ressource a bien été créée !");
            } else {
                toast.error("Erreur: " + response.message);
            }

            return response;
        } catch (e: any) {
            toast.error("Error :" + e, {
                position: toast.POSITION.TOP_LEFT,
            });
        }
    }

    async addResourceChapter({ id, data }) {
        try {
            const body = new FormData();
            body.append("file", data?.resource?.file ?? "");
            const res = await fetch(`${API_ENDPOINT}/resources/${id}`, {
                method: "PATCH",
                headers: {
                    ...authHeader(),
                },
                body: body,
            });

            console.log(res, "res service");

            const response = await res.json();

            if (res.ok) {
                toast.success("Fichier bien sauvegardé");
            } else {
                toast.error("Erreur: " + response.message);
            }

            return response;
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
                toast.error("Erreur: " + response.message);
            }

            return response;
        } catch (e: any) {
            toast.error("Error :" + e, {
                position: toast.POSITION.TOP_LEFT,
            });
            return null;
        }
    }

    async getChapterData(formationId: string) {
        try {
            const res = await fetch(
                `${API_ENDPOINT}/formation-chapter/${formationId}`,
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
                toast.error("Erreur: " + response.message);
            }

            return response;
        } catch (e: any) {
            toast.error("Error :" + e, {
                position: toast.POSITION.TOP_LEFT,
            });
        }
    }

    async getQuizByChapter(id: string) {
        try {
            const res = await fetch(`${API_ENDPOINT}/quiz/${id}/quiz`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...authHeader(),
                },
            });

            const response = await res.json();

            if (res.ok) {
                return response;
            } else {
                toast.error("Erreur: " + response.message);
            }

            return response;
        } catch (e: any) {
            toast.error("Error :" + e, {
                position: toast.POSITION.TOP_LEFT,
            });
        }
    }

    async createQuestionQuiz({ id, data }: any) {
        try {
            const res = await fetch(`${API_ENDPOINT}/quiz/${id}/question`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...authHeader(),
                },
                body: JSON.stringify(data),
            });

            const response = await res.json();

            if (res.ok) {
                toast.success("La question a bien été créée !");
            } else {
                toast.error("Erreur: " + response.message);
            }

            return response;
        } catch (e: any) {
            toast.error("Error :" + e, {
                position: toast.POSITION.TOP_LEFT,
            });
        }
    }

    async getQuizQuestions(id: string) {
        try {
            const res = await fetch(
                `${API_ENDPOINT}/quiz/${id}/full-questions`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        ...authHeader(),
                    },
                }
            );

            const response = await res.json();

            if (!res.ok) {
                toast.error("Erreur: " + response.message);
            }

            return response;
        } catch (e: any) {
            toast.error("Error :" + e, {
                position: toast.POSITION.TOP_LEFT,
            });
        }
    }

    async getQuizQuestionsWithoutAnswersCorrect(id: string) {
        try {
            const res = await fetch(`${API_ENDPOINT}/quiz/${id}/questions`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...authHeader(),
                },
            });

            const response = await res.json();

            if (!res.ok) {
                toast.error("Erreur: " + response.message);
            }

            return response;
        } catch (e: any) {
            toast.error("Error :" + e, {
                position: toast.POSITION.TOP_LEFT,
            });
        }
    }

    async getSelfFormations() {
        const res = await fetch(`${API_ENDPOINT}/formations/current/self`, {
            method: "GET",
            headers: {
                ...authHeader(),
            },
        });
        return await res.json();
    }

    async completeQuiz(quizId: string, answers: QuestionQuiz[]) {
        const res = await fetch(`${API_ENDPOINT}/quiz/complete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...authHeader(),
            },
            body: JSON.stringify({
                quizId,
                answers,
            }),
        });

        if (res.ok) {
            return await res.json();
        } else {
            throw new Error("Erreur lors de la complétion du quiz");
        }
    }

    async getResoucesByChapter(id: string) {
        try {
            const res = await fetch(`${API_ENDPOINT}/resources/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...authHeader(),
                },
            });

            const response = await res.json();

            if (!res.ok) {
                toast.error("Erreur: " + response.message);
            }

            return response;
        } catch (e: any) {
            toast.error("Error :" + e, {
                position: toast.POSITION.TOP_LEFT,
            });
        }
    }

    async getFormationLevel(): Promise<number[] | null> {
        try {
            const res = await fetch(`${API_ENDPOINT}/formations/levels`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...authHeader(),
                },
            });

            const response = await res.json();

            if (!res.ok) {
                toast.error("Erreur: " + response.message);
                return null;
            }

            return response;
        } catch (e: any) {
            toast.error("Error :" + e, {
                position: toast.POSITION.TOP_LEFT,
            });
        }
        return null;
    }

    async getFormation(id: string): Promise<Formation | null> {
        try {
            const res = await fetch(`${API_ENDPOINT}/formations/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...authHeader(),
                },
            });

            const response = await res.json();
            if (!res.ok) {
                toast.error("Erreur: " + response.message);
                return null;
            }

            return mapperFormation(response);
        } catch (e: any) {
            toast.error("Error :" + e, {
                position: toast.POSITION.TOP_LEFT,
            });
        }
        return null;
    }

    async getCurrentFormationProgression(id: string): Promise<any> {
        try {
            const res = await fetch(
                `${API_ENDPOINT}/formations/${id}/progression/self`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        ...authHeader(),
                    },
                }
            );

            const response = await res.json();

            if (!res.ok) {
                if (res.status !== 404) {
                    toast.error("Erreur: " + response.message);
                }
                return null;
            }

            return response;
        } catch (e: any) {
            toast.error("Error :" + e, {
                position: toast.POSITION.TOP_LEFT,
            });
        }
        return null;
    }
}

export default new FormationService();

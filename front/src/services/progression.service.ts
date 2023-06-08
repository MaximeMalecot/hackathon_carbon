import { API_ENDPOINT } from "../constants";
import authHeader from "./auth.header";

class ProgressionService {
    async getSelfProgression(formationId: string) {
        const res = await fetch(
            `${API_ENDPOINT}/formations//${formationId}/progression/self`,
            {
                method: "GET",
                headers: {
                    ...authHeader(),
                },
            }
        );
        return await res.json();
    }

    async getUserFormation(formationId: string, userId: string) {
        const res = await fetch(
            `${API_ENDPOINT}/formations//${formationId}/progression/${userId}`,
            {
                method: "GET",
                headers: {
                    ...authHeader(),
                },
            }
        );
        return await res.json();
    }
}

export default new ProgressionService();

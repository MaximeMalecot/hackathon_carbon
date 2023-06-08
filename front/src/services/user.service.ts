import { API_ENDPOINT } from "../constants/endpoints";
import { UserData } from "../interfaces/user";
import authHeader from "./auth.header";

const mockUser = {
    id: "1",
    email: "test@gmail.com",
    username: "test",
    roles: ["ROLE_USER"],
};

class UserService {
    async getSelf(): Promise<UserData> {
        const res = await fetch(`${API_ENDPOINT}/users/self`, {
            method: "GET",
            headers: {
                ...authHeader(),
            },
        });
        return await res.json();
    }
}

export default new UserService();

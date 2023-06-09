import { API_ENDPOINT } from "../constants/endpoints";
import { UserDto } from "../interfaces/dto/user.dto";
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

    async getUsers(): Promise<UserData[]> {
        const res = await fetch(`${API_ENDPOINT}/users`, {
            method: "GET",
            headers: {
                ...authHeader(),
            },
        });
        return await res.json();
    }

    async getUser(id: string): Promise<UserData> {
        const res = await fetch(`${API_ENDPOINT}/users/${id}`, {
            method: "GET",
            headers: {
                ...authHeader(),
            },
        });
        return await res.json();
    }

    async patchRoles(id: string, roles: Array<string>): Promise<UserData> {
        const res = await fetch(`${API_ENDPOINT}/users/${id}/roles`, {
            method: "PATCH",
            headers: {
                ...authHeader(),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                roles,
            }),
        });
        return await res.json();
    }

    async deleteUser(id: string): Promise<boolean> {
        const res = await fetch(`${API_ENDPOINT}/users/${id}`, {
            method: "DELETE",
            headers: {
                ...authHeader(),
            },
        });
        return res.ok;
    }

    async create(user: UserDto): Promise<Response> {
        const res = await fetch(`${API_ENDPOINT}/users`, {
            method: "POST",
            headers: {
                ...authHeader(),
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        return res;
    }
}

export default new UserService();

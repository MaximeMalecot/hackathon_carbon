import { API_ENDPOINT } from "../constants/endpoints";

class AuthService {
    async login(email: string, password: string) {
        const res = await fetch(`${API_ENDPOINT}/login`, {
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

    async mockLogin(email: string, password: string) {
        const access_token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoidGVzdCIsInJvbGVzIjpbIlJPTEVfVVNFUiJdLCJpYXQiOjE1MTYyMzkwMjJ9.OR_ey4gd5qbP5pcuSqp9T473GTZ-mPwGJCSTDVwHlLM";
        return {
            access_token,
        };
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

export default new AuthService();

import { UserData } from "../interfaces/user";

const mockUser = {
    id: "1",
    email: "test@gmail.com",
    username: "test",
    roles: ["ROLE_USER"],
};

class UserService {
    async getSelf(): Promise<UserData> {
        return mockUser;
    }
}

export default new UserService();

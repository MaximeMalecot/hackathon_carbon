import { useCallback, useState } from "react";
import { useAuthContext } from "../contexts/auth.context";

export default function Login() {
    const { login } = useAuthContext();

    const [formData, setFormData] = useState({
        mail: "",
        password: "",
    });

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            try {
                const { mail, password } = formData;
                if (!mail || !password) throw new Error("Missing field(s)");
                login(mail, password);
            } catch (e: any) {
                console.error(e.message);
            }
        },
        [formData]
    );

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
            }));
        },
        []
    );

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={handleChange}
                    name="mail"
                    type="mail"
                    placeholder="Email"
                />
                <input
                    onChange={handleChange}
                    name="password"
                    type="password"
                    placeholder="Password"
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

import { useCallback, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/auth.context";

export default function Login() {
    const { login, isConnected } = useAuthContext();

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

    if (isConnected) {
        return <Navigate to="/profile" />;
    }
    return (
        <div className="mt-24 ml-0">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center  w-full md:w-screen">
                    <h1 className="uppercase font-bold">Connexion</h1>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            onChange={handleChange}
                            type="mail"
                            name="mail"
                            placeholder="Email"
                            className="input input-bordered w-full max-w-xs"
                        />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Mot de passe</span>
                        </label>
                        <input
                            onChange={handleChange}
                            type="password"
                            name="password"
                            placeholder="Mot de passe"
                            className="input input-bordered w-full max-w-xs"
                        />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <button
                            type="submit"
                            className="btn w-full max-w-xs mt-4"
                        >
                            Se connecter
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

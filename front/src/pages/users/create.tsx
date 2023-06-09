import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ROLES } from "../../constants";
import { UserDto } from "../../interfaces/dto/user.dto";
import userService from "../../services/user.service";

export default function CreateUser() {
    const navigate = useNavigate();
    const [user, setUser] = useState<UserDto>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        roles: [],
    });

    const handleCheckboxClick = useCallback(
        (role: string) => {
            if (!user) return;
            let userRoles = user.roles;
            if (userRoles.includes(role)) {
                userRoles = userRoles.filter((userRole) => userRole !== role);
            } else {
                userRoles.push(role);
            }
            setUser({ ...user, roles: userRoles });
        },
        [user]
    );
    const handleInput = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!user || !e.target?.name || !e.target?.value) return;
            setUser({
                ...user,
                [e.target.name]: e?.currentTarget?.value ?? "",
            });
        },
        [user]
    );

    const handleSave = useCallback(async () => {
        if (!user) return;
        let response = (await userService.create(user)) as any;
        if (response.status === 201) {
            toast.success("L'utilisateur a bien été créé !", {
                position: toast.POSITION.TOP_RIGHT,
            });
            navigate("/gestion-user");
        } else {
            response = await response.json();
            toast.error(JSON.stringify(response?.message), {
                position: toast.POSITION.TOP_RIGHT,
            });
            console.log(response);
        }
    }, [user]);

    return (
        <div>
            <h1 className="text-3xl font-bold">Création d'un utilisateur</h1>
            <div className="mt-5">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Prénom</span>
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Prénom"
                        className="input input-bordered"
                        onChange={handleInput}
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Nom</span>
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Nom"
                        className="input input-bordered"
                        onChange={handleInput}
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        className="input input-bordered"
                        onChange={handleInput}
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="input input-bordered"
                        onChange={handleInput}
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Roles</span>
                    </label>
                    <div className="flex flex-wrap">
                        {Object.values(ROLES).map((role) => (
                            <div className="p-1 w-60 card bordered" key={role}>
                                <div className="form-control">
                                    <label className="cursor-pointer label">
                                        <span className="label-text">
                                            {role}
                                        </span>
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            onChange={(e) =>
                                                handleCheckboxClick(role)
                                            }
                                            value={role}
                                        />
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="form-control">
                    <button className="btn btn-primary" onClick={handleSave}>
                        Créer
                    </button>
                </div>
            </div>
        </div>
    );
}

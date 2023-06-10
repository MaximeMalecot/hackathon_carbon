import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ROLES } from "../../constants";
import { useAuthContext } from "../../contexts/auth.context";
import { useAccess } from "../../hooks/use-access";
import { UserData } from "../../interfaces";
import userService from "../../services/user.service";

export default function SpecificUser() {
    const navigate = useNavigate();
    const [user, setUser] = useState<UserData>();
    const { id } = useParams();
    const { hasAccess } = useAccess();
    const { data } = useAuthContext();

    const fetchUser = useCallback(async () => {
        if (!id) return;
        const response = await userService.getUser(id);
        if (response) {
            setUser(response);
        }
    }, []);

    useEffect(() => {
        fetchUser();
    }, []);

    const handleSave = useCallback(async () => {
        if (!user) return;
        const response = await userService.patchRoles(user._id, user.roles);
        if (response) {
            setUser(response);
            toast.success("Les rôles ont bien été modifiés !", {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    }, [user]);

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

    const deleteUser = useCallback(async (id: string) => {
        console.log("deleting", id);
        const response = await userService.deleteUser(id);
        if (response) {
            toast.success("L'utilisateur a bien été supprimé !", {
                position: toast.POSITION.TOP_RIGHT,
            });
            navigate("/gestion-user");
        }
    }, []);

    return (
        user && (
            <div className="formation-liste">
                <h1 className="text-3xl font-bold text-center uppercase">
                    Modification d'un utilisateur
                </h1>

                {hasAccess([ROLES.ACCOUNT_EDITOR]) ? (
                    <>
                        <section>
                            <p className="text-center mt-5">
                                <span className="font-bold"> Nom : </span>
                                {user?.firstName + " " + user?.lastName}
                            </p>
                            <p className="text-center">
                                <span className="font-bold mt-5">
                                    {" "}
                                    Email :{" "}
                                </span>
                                {user?.email}
                            </p>
                            <div className="font-bold mt-5">Roles :</div>
                            <div className="flex flex-wrap justify-between">
                                {Object.values(ROLES).map((role) => (
                                    <div
                                        className="p-1 w-60 card bordered mt-2"
                                        key={role}
                                    >
                                        <div className="form-control">
                                            <label className="cursor-pointer label">
                                                <span className="label-text">
                                                    {role}
                                                </span>
                                                <input
                                                    type="checkbox"
                                                    className="checkbox"
                                                    onChange={(e) =>
                                                        handleCheckboxClick(
                                                            role
                                                        )
                                                    }
                                                    value={role}
                                                    checked={
                                                        user?.roles?.includes(
                                                            role
                                                        ) ?? false
                                                    }
                                                />
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="form-control mt-2">
                                <button
                                    className="btn btn-primary"
                                    onClick={handleSave}
                                >
                                    Enregistrer
                                </button>
                            </div>
                            {user._id !== data?._id && (
                                <div
                                    className="btn btn-error w-full mt-2"
                                    onClick={() => deleteUser(user._id)}
                                >
                                    Supprimer
                                </div>
                            )}
                        </section>
                    </>
                ) : (
                    <section>
                        <p>Name: {user?.firstName + " " + user?.lastName}</p>
                        <p>Email: {user?.email}</p>
                        <p>Roles: {JSON.stringify(user?.roles)}</p>
                    </section>
                )}
            </div>
        )
    );
}

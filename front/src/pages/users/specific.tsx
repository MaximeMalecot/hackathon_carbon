import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ROLES } from "../../constants";
import { useAccess } from "../../hooks/use-access";
import { UserData } from "../../interfaces";
import userService from "../../services/user.service";

export default function SpecificUser() {
    const [user, setUser] = useState<UserData>();
    const { id } = useParams();
    const { hasAccess } = useAccess();

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

    return (
        <div className="formation-liste">
            <h1 className="text-4xl mb-5">User</h1>
            {hasAccess([ROLES.ACCOUNT_EDITOR]) ? (
                <section>
                    <p>Email: {user?.email}</p>
                    <div>Roles</div>
                    <section>
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
                                            checked={
                                                user?.roles?.includes(role) ??
                                                false
                                            }
                                        />
                                    </label>
                                </div>
                            </div>
                        ))}
                    </section>
                    <button className="btn btn-primary" onClick={handleSave}>
                        Save
                    </button>
                </section>
            ) : (
                <section>
                    <p>Email: {user?.email}</p>
                    <p>Roles: {JSON.stringify(user?.roles)}</p>
                </section>
            )}
        </div>
    );
}

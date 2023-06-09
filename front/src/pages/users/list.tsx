import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ROLES } from "../../constants";
import { useAccess } from "../../hooks/use-access";
import { UserData } from "../../interfaces";
import userService from "../../services/user.service";

export default function ListUsers() {
    const [users, setUsers] = useState<UserData[]>([]);
    const { hasAccess } = useAccess();

    const hasEditorAccess = hasAccess([ROLES.ACCOUNT_EDITOR]);

    const fetchUsers = useCallback(async () => {
        const response = await userService.getUsers();
        if (response) {
            setUsers(response);
        }
    }, []);

    const deleteUser = useCallback(async (id: string) => {
        console.log("deleting", id);
        const response = await userService.deleteUser(id);
        if (response) {
            fetchUsers();
            toast.success("L'utilisateur a bien été supprimé !", {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="formation-liste">
            <h1 className="text-4xl mb-5">Liste des utilisateurs</h1>
            {hasEditorAccess && (
                <Link
                    to="/gestion-user/create"
                    className="btn btn-primary text-neutral"
                >
                    Ajouter un utilisateur
                </Link>
            )}
            <section>
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Roles</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users &&
                            users.map((user, index) => (
                                <tr key={index}>
                                    <th>
                                        {user.firstName + " " + user.lastName}
                                    </th>
                                    <th>{user.email}</th>
                                    <th>{JSON.stringify(user.roles)}</th>
                                    <th>
                                        <Link
                                            to={`/gestion-user/${user._id}`}
                                            className="btn btn-info text-neutral"
                                        >
                                            Go
                                        </Link>
                                    </th>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

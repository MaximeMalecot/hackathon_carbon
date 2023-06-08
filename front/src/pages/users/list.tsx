import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserData } from "../../interfaces";
import userService from "../../services/user.service";

export default function ListUsers() {
    const [users, setUsers] = useState<UserData[]>([]);

    const fetchusers = useCallback(async () => {
        const response = await userService.getUsers();
        if (response) {
            setUsers(response);
        }
    }, []);

    useEffect(() => {
        fetchusers();
    }, []);

    return (
        <div className="formation-liste">
            <h1 className="text-4xl mb-5">Liste des utilisateurs</h1>
            <section>
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Roles</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <th>{user.email}</th>
                                <th>{JSON.stringify(user.roles)}</th>{" "}
                                <Link
                                    to={`/gestion-user/${user._id}`}
                                    className="btn btn-info text-neutral"
                                >
                                    Go
                                </Link>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

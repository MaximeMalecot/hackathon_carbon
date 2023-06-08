import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserData } from "../../interfaces";
import userService from "../../services/user.service";

export default function SpecificUser() {
    const [user, setUser] = useState<UserData>();
    const { id } = useParams();

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

    return (
        <div className="formation-liste">
            <h1 className="text-4xl mb-5">User ${user?._id}</h1>
        </div>
    );
}

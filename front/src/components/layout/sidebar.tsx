import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ROLES } from "../../constants";
import { useAuthContext } from "../../contexts/auth.context";

export default function Sidebar(props: any) {
    const { data, isConnected } = useAuthContext();
    const isTeacher = useMemo(() => {
        return data?.roles.includes(ROLES.TEACHER);
    }, [data]);
    return (
        <ul className="menu bg-base-200 md:w-56 w-full rounded-box md:ml-2 ml-0 md:h-5/6 h-full md:flex justify-between">
            <div>
                <li>
                    <Link to={"/formation/liste"}>Formations</Link>
                </li>
                <li></li>
                {isTeacher && (
                    <li>
                        <details open>
                            <summary>Gestion formation</summary>
                            <ul>
                                <li>
                                    <Link to={"/gestion-formations"}>
                                        Gestion
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/gestion-formations/create"}>
                                        Création de Formation
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>
                )}
            </div>
            <button
                className="md:hidden btn btn-primary mt-5"
                onClick={() => props.setMobileState(false)}
            >
                Close
            </button>
        </ul>
    );
}

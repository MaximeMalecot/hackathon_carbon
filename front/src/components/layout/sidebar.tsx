import { Link } from "react-router-dom";
import { ROLES } from "../../constants";
import { useAccess } from "../../hooks/use-access";

export default function Sidebar(props: any) {
    // const { data, isConnected } = useAuthContext();
    const { hasAccess } = useAccess();
    return (
        <ul className="menu bg-base-200 md:w-56 w-full rounded-box md:ml-2 ml-0 md:h-5/6 h-full md:flex justify-between">
            <div>
                <li>
                    <Link to={"/posts"}>Posts</Link>
                    <Link to={"/formation/liste"}>Formations</Link>
                </li>
                <li></li>
                {hasAccess([ROLES.TEACHER]) && (
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
                {hasAccess([ROLES.NEWS_EDITOR]) && (
                    <li>
                        <details open>
                            <summary>Gestion posts</summary>
                            <ul>
                                <li>
                                    <Link to={"/gestion-posts"}>Gestion</Link>
                                </li>
                                <li>
                                    <Link to={"/gestion-posts/create"}>
                                        Création de Post
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>
                )}
                {hasAccess([ROLES.ACCOUNT_EDITOR, ROLES.VIEWER]) && (
                    <li>
                        <details open>
                            <summary>Gestion user</summary>
                            <ul>
                                <li>
                                    <Link to={"/gestion-user"}>Gestion</Link>
                                </li>
                                <li>
                                    <Link to={"/gestion-user/create"}>
                                        Création de User
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

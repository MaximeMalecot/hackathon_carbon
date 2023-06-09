import { Link } from "react-router-dom";
import { ROLES } from "../../constants";
import { useAccess } from "../../hooks/use-access";

export default function Sidebar(props: any) {
    // const { data, isConnected } = useAuthContext();
    const { hasAccess } = useAccess();
    return (
        <ul className="menu bg-primary text-neutral md:w-56 w-full ml-0 h-full md:flex justify-between">
            <div>
                <li>
                    <Link className="hover:bg-secondary" to={"/posts"}>
                        Posts
                    </Link>
                    <Link
                        className="hover:bg-secondary"
                        to={"/formation/liste"}
                    >
                        Formations
                    </Link>
                </li>
                <li></li>
                {hasAccess([ROLES.TEACHER]) && (
                    <li>
                        <details open>
                            <summary className="md:hover:bg-secondary">
                                Gestion formation
                            </summary>
                            <ul>
                                <li>
                                    <Link
                                        className="hover:bg-secondary"
                                        to={"/gestion-formations"}
                                    >
                                        Gestion
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="hover:bg-secondary"
                                        to={"/gestion-formations/create"}
                                    >
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
                            <summary className="md:hover:bg-secondary">
                                Gestion posts
                            </summary>
                            <ul>
                                <li>
                                    <Link
                                        className="hover:bg-secondary"
                                        to={"/gestion-posts"}
                                    >
                                        Gestion
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="hover:bg-secondary"
                                        to={"/gestion-posts/create"}
                                    >
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
                            <summary className="md:hover:bg-secondary">
                                Gestion user
                            </summary>
                            <ul>
                                <li>
                                    <Link
                                        className="hover:bg-secondary"
                                        to={"/gestion-user"}
                                    >
                                        Gestion
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="hover:bg-secondary"
                                        to={"/gestion-user/create"}
                                    >
                                        Création de User
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>
                )}
                {hasAccess([ROLES.ASSIGNMENT_EDITOR]) && (
                    <li>
                        <details open>
                            <summary className="md:hover:bg-secondary">
                                Gestion contrats
                            </summary>
                            <ul>
                                <li>
                                    <Link
                                        className="hover:bg-secondary"
                                        to={"/contracts"}
                                    >
                                        Gestion
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>
                )}
            </div>
            <button
                className="md:hidden btn btn-secondary mt-5"
                onClick={() => props.setMobileState(false)}
            >
                Close
            </button>
        </ul>
    );
}

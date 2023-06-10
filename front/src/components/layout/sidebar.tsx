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
                    <Link to={"/posts"}>Posts</Link>
                    <Link to={"/formation/liste"}>Formations</Link>
                    <Link to={"/prizes"}>Échanger ses points</Link>
                </li>
                <li></li>
                {hasAccess([ROLES.TEACHER]) && (
                    <li>
                        <details>
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
                        <details>
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
                        <details>
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
                        <details>
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
                                <li>
                                    <Link to={"/contracts/create"}>
                                        Création de contrat
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>
                )}
                {hasAccess([ROLES.ENTREPRISE_EDITOR]) && (
                    <li>
                        <details>
                            <summary className="md:hover:bg-secondary">
                                Gestion entreprises
                            </summary>
                            <ul>
                                <li>
                                    <Link
                                        className="hover:bg-secondary"
                                        to={"/entreprise/liste"}
                                    >
                                        Gestion
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="hover:bg-secondary"
                                        to={"/entreprise/create"}
                                    >
                                        Création d'entreprise
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>
                )}

                {hasAccess([ROLES.PRIZE_EDITOR]) && (
                    <li>
                        <details>
                            <summary className="md:hover:bg-secondary">
                                Gestion échange de points
                            </summary>
                            <ul>
                                <li>
                                    <Link to={"/gestion-prizes"}>Gestion</Link>
                                </li>
                                <li>
                                    <Link to={"/gestion-prizes/create"}>
                                        Création de prix
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

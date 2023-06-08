import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/auth.context";

export default function Header(props: any) {
    const { isConnected, data, logout } = useAuthContext();

    return (
        <header>
            <nav className="navbar bg-primary text-neutral-content">
                <div className="flex-1">
                    <Link
                        to="/"
                        className="btn btn-ghost normal-case text-neutral text-xl"
                    >
                        <img
                            src="../../../public/images/logo/carbon.svg"
                            alt="Carbon logo"
                            className="w-32"
                        />
                    </Link>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1 flex items-center">
                        {isConnected ? (
                            <li className="content-center">
                                <details>
                                    <summary className="text-neutral">
                                        {data?.email}
                                    </summary>
                                    <ul className="p-2 bg-base-100">
                                        <li>
                                            <Link to="/profile">Profil</Link>
                                        </li>
                                        <li>
                                            <button onClick={logout}>
                                                Déconnexion
                                            </button>
                                        </li>
                                    </ul>
                                </details>
                            </li>
                        ) : (
                            <li>
                                <Link
                                    to="/login"
                                    className="btn text-neutral btn-ghost content-center"
                                >
                                    Login
                                </Link>
                            </li>
                        )}
                        <label
                            onClick={() => props.setMobileState(true)}
                            className="md:hidden btn btn-circle swap swap-rotate"
                        >
                            {/* this hidden checkbox controls the state */}
                            <input type="checkbox" />

                            {/* hamburger icon */}
                            <svg
                                className="swap-off fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 512 512"
                            >
                                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                            </svg>

                            {/* close icon */}
                            <svg
                                className="swap-on fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 512 512"
                            >
                                <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                            </svg>
                        </label>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

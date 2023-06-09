import { useCallback, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import RedMedal from "../../assets/icons/red-medal.png";
import { useAuthContext } from "../../contexts/auth.context";

export default function Header(props: any) {
    const navigate = useNavigate();
    const { isConnected, data, logout } = useAuthContext();
    const menuRef = useRef<HTMLHeadElement>(null);
    const subMenuRef = useRef<HTMLDivElement>(null);

    const handleLogout = useCallback(() => {
        logout();
        navigate("/login");
    }, []);

    useEffect(() => {
        const cb = (e: any) => {
            if (!subMenuRef?.current || !menuRef?.current) return;
            if (menuRef.current.contains(e.target)) return;
            subMenuRef.current
                .getElementsByTagName("details")[0]
                .removeAttribute("open");
        };

        if (menuRef.current) {
            document.addEventListener("click", cb);

            return () => {
                document.removeEventListener("click", cb);
            };
        }
    }, [menuRef]);

    return (
        <header ref={menuRef} style={{ position: "relative", zIndex: 10000 }}>
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
                <div ref={subMenuRef} className="flex-none">
                    <ul className="menu menu-horizontal px-1 flex items-center relative z-100">
                        {isConnected ? (
                            <li className="content-center">
                                <details>
                                    <summary className="text-neutral">
                                        <span className="text-xs">
                                            {data?.experiencePoints} Points
                                        </span>
                                        <div
                                            style={{
                                                width: "20px",
                                                height: "20px",
                                                objectFit: "cover",
                                            }}
                                        >
                                            <img src={RedMedal} alt="medal" />
                                        </div>
                                        {data?.firstName + " " + data?.lastName}
                                    </summary>
                                    <ul className="p-2 bg-base-100">
                                        <li>
                                            <Link to="/profile">Profil</Link>
                                        </li>
                                        <li>
                                            <Link to="/transactions">
                                                Historique des prix
                                            </Link>
                                        </li>
                                        <li>
                                            <button onClick={handleLogout}>
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

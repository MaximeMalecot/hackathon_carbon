import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/auth.context";

export default function Header() {
    const { isConnected, data, logout } = useAuthContext();

    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost normal-case text-xl">
                    daisyUI
                    {isConnected ? "y" : "n"}
                </Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    {isConnected ? (
                        <li>
                            <details>
                                <summary>{data!.email}</summary>
                                <ul className="p-2 bg-base-100">
                                    <li>
                                        <button onClick={logout}>Logout</button>
                                    </li>
                                </ul>
                            </details>
                        </li>
                    ) : (
                        <li>
                            <Link
                                to="/login"
                                className="btn btn-square btn-ghost"
                            >
                                Login
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}

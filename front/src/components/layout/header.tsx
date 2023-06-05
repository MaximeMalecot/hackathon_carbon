import { useAuthContext } from "../../contexts/auth.context";

export default function Header() {
    const { isConnected, data } = useAuthContext();

    return (
        <header>
            <h1>Header</h1>
            <p>
                {isConnected ? JSON.stringify(data) : "You are not logged in"}
            </p>
        </header>
    );
}

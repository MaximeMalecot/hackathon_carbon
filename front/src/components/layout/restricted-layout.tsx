import { useState } from "react";
import Login from "../../pages/login";
import Header from "./header";
import Sidebar from "./sidebar";

export default function RestrictedLayout() {
    const [mobileState, setMobileState] = useState(false);
    return (
        <div className="h-screen w-screen">
            {/* mobile sidebar */}
            {mobileState ? (
                <div className="md:hidden block h-screen absolute z-10 w-full">
                    <Sidebar setMobileState={setMobileState} />
                </div>
            ) : (
                <Header setMobileState={setMobileState} />
            )}
            <main className="w-full height-main-container">
                <div className="flex w-full h-full">
                    <section className="container h-full pt-5 px-5">
                        <Login />
                    </section>
                </div>
            </main>
        </div>
    );
}

import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";
import Sidebar from "./sidebar";

export default function AppLayout() {
    const [mobileState, setMobileState] = useState(false);
    return (
        <div className="h-screen w-screen">
            {/* mobile sidebar */}
            {mobileState ? (
                <div className="md:hidden block h-screen absolute z-10 w-full">
                    <Sidebar setMobileState={setMobileState}/>
                </div>
            ) : (
                <Header setMobileState={setMobileState} />
            )}
            <main className="w-full pt-5 height-main-container">
                <div className="flex w-full">
                    <div className="md:block hidden">
                        <Sidebar setMobileState={setMobileState}/>
                    </div>
                    <section className="container px-5">
                        <Outlet />
                    </section>
                </div>
            </main>
        </div>
    );
}

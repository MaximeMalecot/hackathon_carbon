import { useState } from "react";
import Header from "./header";
import Sidebar from "./sidebar";

export default function AppLayout() {
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
                    <div className="md:block hidden h-full">
                        <Sidebar setMobileState={setMobileState} />
                    </div>
                    <section className="container h-full pt-5 px-5 overflow-y-auto">
                        <span className="loading loading-spinner loading-lg"></span>
                    </section>
                </div>
            </main>
        </div>
    );
}

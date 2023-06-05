import { Suspense, useState, lazy } from "react";
import AppLayout from "./components/layout/app-layout";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/home"));
const NotFound = lazy(() => import("./pages/404"));

function App() {
    return (
        <>
            <Suspense>
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route path={"/"} element={<Home />} />
                        <Route path={"*"} element={<NotFound />} />
                    </Route>
                </Routes>
            </Suspense>
        </>
    );
}

export default App;

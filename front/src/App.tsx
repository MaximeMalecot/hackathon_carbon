import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/app-layout";

const Home = lazy(() => import("./pages/home"));
const Login = lazy(() => import("./pages/login"));
const NotFound = lazy(() => import("./pages/404"));
const Formations = lazy(() => import("./pages/formation/list-formation"));

function App() {
    return (
        <div className="App relative">
            <Suspense>
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route path={"/formations"}>
                            <Route path={"liste"} element={<Formations />} />
                        </Route>
                        <Route path={"/login"} element={<Login />} />
                        <Route path={"/"} element={<Home />} />
                        <Route path={"*"} element={<NotFound />} />
                    </Route>
                </Routes>
            </Suspense>
        </div>
    );
}

export default App;

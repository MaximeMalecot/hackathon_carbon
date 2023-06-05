import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/app-layout";

const Home = lazy(() => import("./pages/home"));
const NotFound = lazy(() => import("./pages/404"));

function App() {
    return (
        <div className="App">
            <Suspense>
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route path={"/"} element={<Home />} />
                        <Route path={"*"} element={<NotFound />} />
                    </Route>
                </Routes>
            </Suspense>
        </div>
    );
}

export default App;

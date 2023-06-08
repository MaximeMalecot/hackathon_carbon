import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AppLayout from "./components/layout/app-layout";
import { ROLES } from "./constants";
import { useAuthContext } from "./contexts/auth.context";
import CreationEntreprise from "./pages/entreprise/create-entreprise";
import ListUsers from "./pages/users/list";
import SpecificUser from "./pages/users/specific";

//#region Routes
const Home = lazy(() => import("./pages/home"));
const Login = lazy(() => import("./pages/login"));
const NotFound = lazy(() => import("./pages/404"));
const FormationsListe = lazy(() => import("./pages/formation/list-formation"));
const Formation = lazy(() => import("./pages/formation/formation"));
const GestionFormations = lazy(
    () => import("./pages/formation/gestion-formations")
);
const Quiz = lazy(() => import("./pages/formation/quiz"));
const CreationFormation = lazy(
    () => import("./pages/formation/creation-formation")
);
//#endregion

function App() {
    //#region Auth
    const { data, isConnected } = useAuthContext();
    //#endregion

    const hasAccess = (roles: Array<string>) => {
        if (!data) return false;
        if (data.roles.includes(ROLES.ADMIN)) return true;
        return roles.some((role) => data?.roles.includes(role));
    };

    return (
        <div className="App relative">
            <Suspense
                fallback={
                    <span className="loading loading-spinner loading-lg"></span>
                }
            >
                <ToastContainer />
                <Routes>
                    <Route element={<AppLayout />}>
                        {isConnected && (
                            <>
                                <Route path={"/formation"}>
                                    <Route
                                        path={"liste"}
                                        element={<FormationsListe />}
                                    />
                                    <Route
                                        path={"quiz/:id"}
                                        element={<Quiz />}
                                    />
                                    <Route
                                        path={":id"}
                                        element={<Formation />}
                                    />
                                </Route>
                                {hasAccess([ROLES.TEACHER]) && (
                                    <Route path={"/gestion-formations"}>
                                        <Route
                                            index
                                            element={<GestionFormations />}
                                        />
                                        <Route
                                            path={"create"}
                                            element={<CreationFormation />}
                                        />
                                        <Route
                                            path={"quiz/create/:id"}
                                            element={<CreationFormation />}
                                        />
                                    </Route>
                                )}
                                {hasAccess([
                                    ROLES.ACCOUNT_EDITOR,
                                    ROLES.VIEWER,
                                ]) && (
                                    <Route path={"/gestion-user"}>
                                        <Route index element={<ListUsers />} />
                                        <Route
                                            path={":id"}
                                            element={<SpecificUser />}
                                        />
                                        {hasAccess([ROLES.ACCOUNT_EDITOR]) && (
                                            <Route
                                                path={"create"}
                                                element={<SpecificUser />}
                                            />
                                        )}
                                    </Route>
                                )}
                                <Route path={"/entreprise"}>
                                    <Route
                                        path={"create"}
                                        element={<CreationEntreprise />}
                                    />
                                </Route>
                                <Route path={"/"} element={<Home />} />
                            </>
                        )}
                        <Route path={"/login"} element={<Login />} />

                        <Route path={"*"} element={<NotFound />} />
                    </Route>
                </Routes>
            </Suspense>
        </div>
    );
}

export default App;

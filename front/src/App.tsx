import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AppLayout from "./components/layout/app-layout";
import CreationEntreprise from "./pages/entreprise/create-entreprise";
import CreatePost from "./pages/posts/createPost";
import ListPosts from "./pages/posts/listPosts";

const Home = lazy(() => import("./pages/home"));
const Login = lazy(() => import("./pages/login"));
const NotFound = lazy(() => import("./pages/404"));
const FormationsListe = lazy(() => import("./pages/formation/list-formation"));
const Formation = lazy(() => import("./pages/formation/formation"));
const Quiz = lazy(() => import("./pages/formation/quiz"));

function App() {
    return (
        <div className="App relative">
            <Suspense>
                <ToastContainer />
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route path={"/formation"}>
                            <Route
                                path={"liste"}
                                element={<FormationsListe />}
                            />
                            <Route path={"quiz/:id"} element={<Quiz />} />
                            <Route path={":id"} element={<Formation />} />
                        </Route>
                        <Route path={"/entreprise"}>
                            <Route
                                path={"create"}
                                element={<CreationEntreprise />}
                            />
                        </Route>
                        <Route path={"/login"} element={<Login />} />
                        <Route path={"/"} element={<Home />} />
                        <Route path={"*"} element={<NotFound />} />
                        <Route path={"/posts"}>
                            <Route path={"liste"} element={<ListPosts />} />
                            <Route path={"create"} element={<CreatePost />} />
                        </Route>
                    </Route>
                </Routes>
            </Suspense>
        </div>
    );
}

export default App;

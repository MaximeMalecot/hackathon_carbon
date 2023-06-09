import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AppLayout from "./components/layout/app-layout";
import RestrictedLayout from "./components/layout/restricted-layout";
import { ROLES } from "./constants";
import { useAuthContext } from "./contexts/auth.context";
import { useAccess } from "./hooks/use-access";
import CreationEntreprise from "./pages/entreprise/create-entreprise";
import Entreprise from "./pages/entreprise/entreprise-view";
import ListEntreprises from "./pages/entreprise/list-entreprise";
import CreatePost from "./pages/posts/createPost";
import EditPost from "./pages/posts/edit";
import { default as ListPosts } from "./pages/posts/listPosts";
import SpecificPost from "./pages/posts/specific";
import CreateUser from "./pages/users/create";
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
const CreationChapterFormation = lazy(
    () => import("./pages/formation/create-chapter-formation")
);
const CreateQuestionQuiz = lazy(
    () => import("./pages/formation/create-question-quiz")
);
const CoursRessource = lazy(() => import("./pages/formation/cours-ressource"));

const Profile = lazy(() => import("./pages/profile"));

const Prizes = lazy(() => import("./pages/prizes"));
const ManagePrizes = lazy(() => import("./pages/prizes/manage-prizes"));
const CreatePrize = lazy(() => import("./pages/prizes/create-prize"));

const Contracts = lazy(() => import("./pages/contracts"));
const Contract = lazy(() => import("./pages/contracts/contract"));
const ContractCreate = lazy(() => import("./pages/contracts/create-contracts"));

const Transactions = lazy(() => import("./pages/transactions"));
//#endregion

function App() {
    //#region Auth
    const { data, isConnected } = useAuthContext();
    const { hasAccess } = useAccess();
    //#endregion

    return (
        <div className="App relative">
            <Suspense
                fallback={
                    <span className="loading loading-spinner loading-lg"></span>
                }
            >
                <ToastContainer />
                <Routes>
                    <Route
                        element={
                            isConnected ? <AppLayout /> : <RestrictedLayout />
                        }
                    >
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
                                <Route path={"/posts"}>
                                    <Route index element={<Home />} />
                                    <Route
                                        path={":id"}
                                        element={<SpecificPost />}
                                    />
                                </Route>
                                <Route
                                    path={"/formation/cours/:id"}
                                    element={<CoursRessource />}
                                />
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
                                            path="quiz/:id"
                                            element={<CreateQuestionQuiz />}
                                        />

                                        <Route
                                            path={":id"}
                                            element={
                                                <CreationChapterFormation />
                                            }
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
                                                element={<CreateUser />}
                                            />
                                        )}
                                    </Route>
                                )}
                                {hasAccess([ROLES.NEWS_EDITOR]) && (
                                    <Route path={"/gestion-posts"}>
                                        <Route index element={<ListPosts />} />
                                        <Route
                                            path={"create"}
                                            element={<CreatePost />}
                                        />
                                        <Route
                                            path={"edit/:id"}
                                            element={<EditPost />}
                                        />
                                    </Route>
                                )}
                                {hasAccess([ROLES.ASSIGNMENT_EDITOR]) && (
                                    <>
                                        <Route
                                            path={"/contracts"}
                                            element={<Contracts />}
                                        />
                                        <Route
                                            path={"/contracts/create"}
                                            element={<ContractCreate />}
                                        />
                                    </>
                                )}

                                {hasAccess([
                                    ROLES.ASSIGNMENT_EDITOR,
                                    ROLES.USER,
                                ]) && (
                                    <Route
                                        path="/contracts/:id"
                                        element={<Contract />}
                                    />
                                )}
                                <Route path={"/entreprise"}>
                                    <Route
                                        path={":id"}
                                        element={<Entreprise />}
                                    />
                                    <Route
                                        path={"create"}
                                        element={<CreationEntreprise />}
                                    />
                                    <Route
                                        path={"liste"}
                                        element={<ListEntreprises />}
                                    />
                                </Route>
                                <Route path={"/prizes"} element={<Prizes />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path={"/"} element={<Home />} />

                                {hasAccess([ROLES.PRIZE_EDITOR]) && (
                                    <Route path={"/gestion-prizes"}>
                                        <Route
                                            index
                                            element={<ManagePrizes />}
                                        />
                                        <Route
                                            path={"create"}
                                            element={<CreatePrize />}
                                        />
                                    </Route>
                                )}
                                <Route
                                    path={"/transactions"}
                                    element={<Transactions />}
                                />
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

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChapterTypes } from "../../constants";
import FormationService from "../../services/formation.service";

export const DisplayChapters = () => {
    const params = useParams<{ id: string }>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [chapters, setChapters] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const fetchChaptersAndQuizzes = async () => {
        const response = await FormationService.getFormationChapters(
            params?.id ?? ""
        );
        if (response.length > 0) {
            console.log(response, " etete");
            setChapters(response);
        }

        response.map(async (element) => {
            if (element.type === ChapterTypes.QUIZ.toUpperCase()) {
                const res = await FormationService.getQuizByChapter(
                    element._id
                );
                if (!res.statusCode) {
                    setQuizzes([...quizzes, res]);
                }
            }
        });
    };
    useEffect(() => {
        if (!isLoading) {
            fetchChaptersAndQuizzes();
        }
        setIsLoading(false);
    }, [isLoading]);
    return (
        <section className="grid xl:grid-cols-3 sm:grid-cols-2 gap-4 mt-5">
            {chapters.map((formation, index) => (
                <div
                    key={index}
                    className="card max-w-sm w-auto bg-base-100 shadow-xl"
                >
                    <div className="card-body">
                        <h2 className="card-title">
                            Chapitre : {formation?.name}
                        </h2>
                        <p className="card-actions">{formation?.type}</p>
                        {formation?.type ===
                            ChapterTypes.QUIZ.toUpperCase() && (
                            <div className="card-actions justify-end">
                                <Link
                                    to={`/gestion-formations/quiz/${quizzes[index]?._id}`}
                                >
                                    <button className="btn btn-primary">
                                        Voir le chapitre
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </section>
    );
};

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChapterTypes } from "../../constants";
import FormationService from "../../services/formation.service";

export const DisplayChapters = () => {
    const params = useParams<{ id: string }>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [chapters, setChapters] = useState<any[]>([]);
    const [quizzes, setQuizzes] = useState<any[]>([]);

    const fetchChaptersAndQuizzes = async () => {
        const chaptersRes: any[] | null =
            await FormationService.getFormationChapters(params?.id ?? "");
        if (
            chaptersRes &&
            Array.isArray(chaptersRes) &&
            chaptersRes.length > 0
        ) {
            setChapters(chaptersRes);
        } else {
            return;
        }

        chaptersRes.forEach(async (chapter, index) => {
            if (chapter.type === ChapterTypes.QUIZ.toUpperCase()) {
                const res = await FormationService.getQuizByChapter(
                    chapter._id
                );
                console.log(res, "res");
                if (!res.statusCode) {
                    setQuizzes((prev) => [
                        ...prev,
                        { ...res, indexChapter: index },
                    ]);
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

    const getQuizId = (index: number) => {
        const quiz = quizzes.find((quiz) => quiz.indexChapter === index);
        return quiz?._id;
    };

    return (
        <section className="grid xl:grid-cols-3 sm:grid-cols-2 gap-4 mt-5">
            {chapters.length > 0 &&
                chapters.map((formation: any, index) => (
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
                                        to={`/gestion-formations/quiz/${getQuizId(
                                            index
                                        )}`}
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

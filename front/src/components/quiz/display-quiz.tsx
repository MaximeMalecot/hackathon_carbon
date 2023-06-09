import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormationService from "../../services/formation.service";

export const DisplayQuiz = () => {
    const params = useParams<{ id: string }>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [quizzes, setQuizzes] = useState({});
    const fetchChaptersAndQuizzes = useCallback(async () => {
        const response = await FormationService.getQuizQuestions(
            params?.id ?? ""
        );
        if (!response.statusCode) {
            setQuizzes(response);
        }
    }, [params]);

    useEffect(() => {
        if (!isLoading) {
            fetchChaptersAndQuizzes();
        }
        setIsLoading(false);
    }, [isLoading]);
    return (
        <>
            <section className="grid xl:grid-cols-3 sm:grid-cols-2 gap-4 mt-5">
                {quizzes &&
                    quizzes?.questions?.map((quiz, index) => (
                        <div
                            key={index}
                            className="card max-w-sm w-auto bg-base-100 shadow-xl"
                        >
                            <div className="card-body">
                                <h2 className="card-title">
                                    Chapitre : {quiz?.label}
                                </h2>
                                <p className="card-actions">Reponses :</p>
                                {quiz?.answers.map((answer, index) => (
                                    <p
                                        key={index}
                                        className={`card-actions ${
                                            answer.isCorrect
                                                ? "text-success"
                                                : "text-secondary"
                                        }`}
                                    >
                                        {answer.label}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}
            </section>
        </>
    );
};

import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Quiz from "../../components/quiz/quiz";
import { useAuthContext } from "../../contexts/auth.context";
import formationService from "../../services/formation.service";

export interface QuizResult {
    mark: string;
}

const QuizLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="">
            <h1 className="text-4xl mb-5">Quiz</h1>
            {children}
        </div>
    );
};

export default function QuizPage() {
    const { reload } = useAuthContext();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const params = useParams<{ id: string }>();
    const [quizData, setQuizData] = useState<{
        id: string;
        questions: any[];
        chapterId: string;
    } | null>(null);
    const [result, setResult] = useState<QuizResult | null>(null);
    const [formationId, setFormationId] = useState<string | any>(null);

    useEffect(() => {
        if (!isLoading) {
            fetchQuiz();
        }
        setIsLoading(false);
    }, [isLoading]);

    useEffect(() => {
        setTimeout(() => {
            reload();
        }, 1000);
    }, []);

    const fetchChapter = useCallback(async (formationId: string) => {
        const res = await formationService.getChapterData(formationId);
        if (!res.statusCode) {
            setFormationId(res.formationId);
        }
    }, []);

    const fetchQuiz = useCallback(async () => {
        if (!params.id) return;

        const response = await formationService.getQuizByChapter(params.id);

        if (!response.statusCode) {
            const quizRes =
                await formationService.getQuizQuestionsWithoutAnswersCorrect(
                    response._id
                );

            if (!quizRes.statusCode) {
                setQuizData({
                    id: quizRes._id,
                    questions: quizRes.questions,
                    chapterId: response.chapterId,
                });
            }

            fetchChapter(response.chapterId);
        }
    }, [params.id]);

    if (isLoading)
        return (
            <QuizLayout>
                <div>Loading...</div>
            </QuizLayout>
        );

    if (result && quizData)
        return (
            <QuizLayout>
                <div className="hero">
                    <div className="hero-content text-center">
                        <div className="max-w-md">
                            <p className="text-3xl py-6">
                                Voici votre résultat pour ce quiz :
                            </p>
                            <h1 className="text-5xl font-bold mb-5">
                                <div
                                    className="radial-progress text-success bg-gray-100"
                                    style={{
                                        "--value": result.mark.replace("%", ""),
                                        "--size": "12rem",
                                        "--thickness": "10px",
                                    }}
                                >
                                    {result.mark}
                                </div>
                            </h1>

                            <Link
                                to={`/formation/${formationId}`}
                                className="btn btn-primary"
                            >
                                Retour à la formation
                            </Link>
                        </div>
                    </div>
                </div>
            </QuizLayout>
        );

    if (quizData)
        return (
            <QuizLayout>
                <Quiz quiz={quizData} setResult={setResult} />
            </QuizLayout>
        );
}

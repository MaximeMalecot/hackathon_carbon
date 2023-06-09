import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Quiz from "../../components/quiz/quiz";
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
                <div className="hero min-h-screen bg-base-200">
                    <div className="hero-content text-center">
                        <div className="max-w-md">
                            <h1 className="text-5xl font-bold">
                                {result.mark}
                            </h1>
                            <p className="py-6">
                                Provident cupiditate voluptatem et in. Quaerat
                                fugiat ut assumenda excepturi exercitationem
                                quasi. In deleniti eaque aut repudiandae et a id
                                nisi.
                            </p>
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

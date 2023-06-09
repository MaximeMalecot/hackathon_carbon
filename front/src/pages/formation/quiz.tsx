import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
    } | null>(null);
    const [result, setResult] = useState<QuizResult | null>(null);

    useEffect(() => {
        if (!isLoading) {
            fetchQuiz();
        }
        setIsLoading(false);
    }, [isLoading]);

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
                });
            }
        }
    }, [params.id]);

    if (isLoading)
        return (
            <QuizLayout>
                <div>Loading...</div>
            </QuizLayout>
        );

    if (result)
        return (
            <QuizLayout>
                <div>Result: {result.mark}</div>
            </QuizLayout>
        );

    if (quizData)
        return (
            <QuizLayout>
                <Quiz quiz={quizData} setResult={setResult} />
            </QuizLayout>
        );
}

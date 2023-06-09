import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { AnswersQuestion, Question } from "../../components";
import { fractionToPercent, mapperQuizQuestion } from "../../helpers";
import { QuestionQuiz, SendAnswer } from "../../interfaces";
import formationService from "../../services/formation.service";

export default function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [selectedAnswers, setSelectedAnswer] = useState<SendAnswer[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [questions, setQuestions] = useState<QuestionQuiz[]>([]);
    const params = useParams<{ id: string }>();

    const currentQuestionId = useMemo(() => {
        // console.log(
        //     "questionsId",
        //     questions.map((i) => i.id)
        // );
        return questions[currentQuestion - 1]?.id;
    }, [currentQuestion, questions]);

    const currentAnswers = useMemo(() => {
        return (
            selectedAnswers.find((ele) => ele.questionId === currentQuestionId)
                ?.answers ?? null
        );
    }, [selectedAnswers, currentQuestionId]);

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
            const res =
                await formationService.getQuizQuestionsWithoutAnswersCorrect(
                    response._id
                );
            if (!res.statusCode) {
                res?.questions.map((item: any) => {
                    console.log(item, "item");
                    const value = mapperQuizQuestion(item);
                    setQuestions((prev) => [...prev, value]);
                });
            }
        }
    }, [params.id]);

    const validateQuiz = useCallback(
        (answers: any[]) => {
            try {
                console.log(
                    "ending with",
                    answers.map((i) => {
                        return { ...i, answers: i.answers.length };
                    })
                );
            } catch (e: any) {
                console.log(e.message);
            }
        },
        [selectedAnswers]
    );

    const setNextQuestion = useCallback(
        (receivedAnswers: string[]) => {
            let answersToQuestion = [];
            if (currentAnswers) {
                const updatedAnswers = Array.from(
                    new Set([...currentAnswers, ...receivedAnswers])
                );

                answersToQuestion = selectedAnswers.map((el) => {
                    if (el.questionId === currentQuestionId) {
                        return {
                            ...el,
                            answers: updatedAnswers,
                        };
                    }
                    return el;
                });
            } else {
                answersToQuestion = [
                    ...selectedAnswers,
                    {
                        questionId: currentQuestionId,
                        answers: receivedAnswers,
                    },
                ];
            }
            setSelectedAnswer(answersToQuestion);
            if (currentQuestion !== questions.length) {
                setCurrentQuestion((prev) => prev + 1);
            } else {
                validateQuiz(answersToQuestion);
            }
        },
        [
            currentAnswers,
            currentQuestion,
            questions,
            selectedAnswers,
            currentQuestionId,
        ]
    );

    const setBackQuestion = useCallback(() => {
        if (currentQuestion !== 1) {
            setCurrentQuestion(currentQuestion - 1);
        }
    }, [currentQuestion]);

    return (
        <div className="">
            <h1 className="text-4xl mb-5">Quiz</h1>

            <div className="card w-full h-full bg-base-100 shadow-xl">
                <div className="card-body pt-2 pb-5 px-5">
                    <div className="flex justify-center">
                        <progress
                            className="progress progress-success bg-primary w-56"
                            value={fractionToPercent(
                                currentQuestion,
                                questions.length
                            )}
                            max="100"
                        ></progress>
                    </div>
                    <Question
                        nbQuestion={currentQuestion}
                        labelQuestion={questions[currentQuestion - 1]?.label}
                    />
                    <AnswersQuestion
                        initValue={currentAnswers}
                        nbQuestions={questions.length}
                        answers={questions[currentQuestion - 1]?.answers}
                        currentQuestion={currentQuestion}
                        setBackQuestion={setBackQuestion}
                        setNextQuestion={setNextQuestion}
                    />
                </div>
            </div>
        </div>
    );
}

import { useCallback, useMemo, useState } from "react";
import { AnswersQuestion, Question } from "../../components";
import { fractionToPercent } from "../../helpers";
import { Answer, QuestionQuiz, SendAnswer } from "../../interfaces";

export default function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [selectedAnswers, setSelectedAnswer] = useState<SendAnswer[]>([]);

    const questions: QuestionQuiz[] = [
        {
            id: 1,
            label: "What is the capital of France?",
            answers: [
                { id: 1, label: "New York" },
                { id: 2, label: "London" },
                { id: 3, label: "Paris" },
                { id: 4, label: "Dublin" },
            ] as Answer[],
        },
        {
            id: 2,
            label: "What is the capital of France?",
            answers: [
                { id: 1, label: "New York" },
                { id: 2, label: "London" },
                { id: 3, label: "Paris" },
                { id: 4, label: "Dublin" },
            ] as Answer[],
        },
        {
            id: 3,
            label: "What is the capital of France?",
            answers: [
                { id: 1, label: "New York" },
                { id: 2, label: "London" },
                { id: 3, label: "Paris" },
                { id: 4, label: "Dublin" },
            ] as Answer[],
        },
    ];

    const currentQuestionId = useMemo(() => {
        return questions[currentQuestion - 1].id;
    }, [currentQuestion]);

    const currentAnswers = useMemo(() => {
        return (
            selectedAnswers.find((ele) => ele.questionId === currentQuestionId)
                ?.answers ?? null
        );
    }, [selectedAnswers, currentQuestionId]);

    const validateQuiz = useCallback(() => {
        console.log(selectedAnswers);
    }, [selectedAnswers]);

    const setNextQuestion = useCallback(
        (answers: number[]) => {
            if (currentAnswers) {
                setSelectedAnswer(
                    selectedAnswers.map((ele) =>
                        ele.questionId === currentQuestionId
                            ? { ...ele, answers }
                            : ele
                    )
                );
            } else {
                setSelectedAnswer([
                    ...selectedAnswers,
                    {
                        questionId: currentQuestionId,
                        answers,
                    },
                ]);
            }

            if (currentQuestion !== questions.length) {
                setCurrentQuestion(currentQuestion + 1);
            } else {
                return validateQuiz();
            }
        },
        [
            currentAnswers,
            currentQuestion,
            questions.length,
            selectedAnswers,
            currentQuestionId,
            validateQuiz,
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
                        labelQuestion={questions[currentQuestion - 1].label}
                    />
                    <AnswersQuestion
                        initValue={currentAnswers}
                        nbQuestions={questions.length}
                        answers={questions[currentQuestion - 1].answers}
                        currentQuestion={currentQuestion}
                        setBackQuestion={setBackQuestion}
                        setNextQuestion={setNextQuestion}
                    />
                </div>
            </div>
        </div>
    );
}

import { useCallback, useEffect, useState } from "react";
import { Answer } from "../../interfaces";
interface AnswersQuestionProps {
    answers: Answer[];
    initValue: number[] | null;
    nbQuestions: number;
    currentQuestion: number;
    setNextQuestion: (answers: number[]) => void;
    setBackQuestion: () => void;
}

export const AnswersQuestion = ({
    answers,
    initValue,
    nbQuestions,
    currentQuestion,
    setNextQuestion,
    setBackQuestion,
}: AnswersQuestionProps) => {
    const [currentAnswer, setCurrentAnswer] = useState<number[]>([]);
    useEffect(() => {
        if (!initValue) return;
        setCurrentAnswer(initValue ?? []);
    }, [initValue]);

    const handleAnswer = useCallback(
        (answerClicked: Answer) => {
            if (currentAnswer.includes(answerClicked.id)) {
                setCurrentAnswer(
                    currentAnswer.filter((elem) => elem !== answerClicked.id)
                );
            } else {
                setCurrentAnswer([...currentAnswer, answerClicked.id]);
            }
        },
        [currentAnswer]
    );

    const nextQuestion = useCallback(() => {
        setNextQuestion(currentAnswer);
        setCurrentAnswer([]);
    }, [currentAnswer, setNextQuestion]);

    return (
        <>
            <div className="grid xl:grid-cols-3 sm:grid-cols-2 gap-4">
                {answers.map((answerOption, index) => (
                    <div
                        key={index}
                        className="indicator shadow-sm hover:shadow-xl w-full cursor-pointer"
                        onClick={() => handleAnswer(answerOption)}
                    >
                        {currentAnswer.includes(answerOption.id) ? (
                            <span className="indicator-item badge badge-secondary">
                                ✔
                            </span>
                        ) : null}

                        <div className="grid h-32 p-5 w-full rounded bg-neutral border border-base-200 place-items-center overflow-y-auto">
                            <p className="text-primary text-sm">
                                {answerOption.label}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="card-actions mt-4 justify-between">
                <button
                    className="btn btn-accent text-neutral"
                    onClick={() => setBackQuestion()}
                    disabled={currentQuestion === 1}
                >
                    Back
                </button>
                <button
                    className="btn btn-accent text-neutral"
                    onClick={() => nextQuestion()}
                    disabled={currentAnswer.length === 0}
                >
                    {currentQuestion === nbQuestions ? "Finish" : "Next"}
                </button>
            </div>
        </>
    );
};

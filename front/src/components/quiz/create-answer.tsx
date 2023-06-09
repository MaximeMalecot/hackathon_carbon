import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { CreateAnswersVM } from "../../interfaces";

interface Props {
    submit: (set: CreateAnswersVM[]) => void;
}
export const CreateAnswers = ({ submit }: Props) => {
    const [formData, setFormData] = useState<CreateAnswersVM[]>([]);
    const [value, setValue] = useState<string>("");
    const [isCorrect, setIsCorrect] = useState<boolean>(false);

    const addValue = useCallback(
        (e) => {
            e.preventDefault();
            if (!value) return toast.error("Missing field(s)");
            setFormData((prev) => [
                ...prev,
                { isCorrect: isCorrect, label: value },
            ]);
            setValue("");
            setIsCorrect(false);
        },
        [value, isCorrect]
    );

    const removeValue = useCallback((e, index: number) => {
        e.preventDefault();
        setFormData((prev) => {
            const copy = [...prev];
            copy.splice(index, 1);
            return copy;
        });
    }, []);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (formData.length < 2) return toast.error("Minimum 2 reponses");
        const isCorrect = formData.some((x) => x.isCorrect);
        if (!isCorrect) return toast.error("Minimum 1 reponse correct");
        submit(formData);
        setFormData([]);
        setValue("");
    }, [formData, submit]);

    return (
        <>
            <label className="label">
                <span className="label-text">Réponse</span>
            </label>
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type="text"
                className="input input-bordered w-full max-w-xs"
            />
            <div className="flex">
                <label className="swap mr-2">la reponse est correct :</label>
                <input
                    type="checkbox"
                    checked={isCorrect}
                    onChange={(e) => setIsCorrect(e.target.checked)}
                    className="checkbox checkbox-success"
                />
            </div>
            <div>
                <button className="btn btn-primary" onClick={addValue}>
                    Ajouter
                </button>
            </div>
            <p className="mt-5">Liste des reponses possible :</p>
            <section className="grid xl:grid-cols-3 sm:grid-cols-2 gap-4 w-full">
                {formData.map((answer, index) => (
                    <div
                        key={index}
                        className="card max-w-sm w-auto bg-base-100 p-4 shadow-xl"
                    >
                        <span
                            key={index}
                            className={`text-${
                                answer.isCorrect ? "success" : "secondary"
                            } mb-3`}
                        >
                            {answer.label}
                        </span>
                        <button
                            className="btn btn-secondary"
                            onClick={(e) => removeValue(e, index)}
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </section>
            <button className="btn btn-primary mt-5" onClick={handleSubmit}>
                Submit
            </button>
        </>
    );
};

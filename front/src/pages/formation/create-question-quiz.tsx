import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CreateAnswers, DisplayQuiz } from "../../components";
import { CreateAnswersDTO, CreateAnswersVM } from "../../interfaces";
import formationService from "../../services/formation.service";

export default function CreateQuestionQuiz() {
    const [questionName, setQuestionName] = useState<string>("");
    const params = useParams<{ id: string }>();

    const handleSubmit = async (values: CreateAnswersVM[]) => {
        if (!questionName) return toast.error("Missing field(s)");
        const data: CreateAnswersDTO = {
            label: questionName,
            answers: values,
        };

        const res = await formationService.createQuestionQuiz({
            id: params.id ?? "",
            data,
        });
    };
    return (
        <div>
            <h1 className="text-4xl mb-5">Creation de question pour le quiz</h1>
            <form>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Nom de la question</span>
                    </label>
                    <input
                        onChange={(e) => setQuestionName(e.target.value)}
                        type="text"
                        name="name"
                        placeholder="Ex: Formation React"
                        className="input input-bordered w-full max-w-xs"
                        value={questionName}
                    />
                    <CreateAnswers submit={handleSubmit} />
                </div>
            </form>
            <DisplayQuiz />
        </div>
    );
}

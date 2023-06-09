import { useCallback, useState } from "react";
import { toast } from "react-toastify";

interface Props {
    submit: (set: any) => void;
}

export const CreateRessource = ({ submit }: Props) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        file: null,
    });

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
            }));
        },
        []
    );

    const handleChangeFile = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData((prev) => ({
                ...prev,
                [e.target.name]: e.target.files?.[0],
            }));
        },
        []
    );

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (!formData.title || !formData.description || !formData.file)
            return toast.error("Missing field(s)");

        submit(formData);
    }, [formData]);

    return (
        <>
            <label className="label">
                <span className="label-text">Title quiz</span>
            </label>
            <input
                onChange={handleChange}
                type="text"
                name="title"
                placeholder="Ex: Formation React"
                className="input input-bordered w-full max-w-xs"
                value={formData.title}
            />
            <label className="label">
                <span className="label-text">Description</span>
            </label>
            <input
                onChange={handleChange}
                type="text"
                name="description"
                placeholder="description chapter"
                className="input input-bordered w-full max-w-xs"
                value={formData.description}
            />
            <label className="label">
                <span className="label-text">Fichier</span>
            </label>
            <input
                name="file"
                onChange={handleChangeFile}
                type="file"
                className="file-input file-input-bordered w-full max-w-xs"
            />
            <div className="form-control w-full max-w-xs">
                <button
                    onClick={handleSubmit}
                    className="btn w-full max-w-xs mt-4"
                >
                    Enregister
                </button>
            </div>
        </>
    );
};

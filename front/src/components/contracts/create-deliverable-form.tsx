import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export interface CreateDeliverableData {
    file: any;
    title: string;
}

interface CreateDeliverableFormProps {
    contractId: string;
    create: (deliverable: CreateDeliverableData) => Promise<void>;
}

export default function CreateDeliverableForm({
    contractId,
    create,
}: CreateDeliverableFormProps) {
    const [formData, setFormData] = useState<CreateDeliverableData>({
        file: null,
        title: "",
    });

    const handleSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            try {
                const { title, file } = formData;
                if (!title || !file) throw new Error("Champ(s) manquant(s)");
                await create(formData);
            } catch (e: any) {
                toast.error("Erreur: " + e.message, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        },
        [formData]
    );

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

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center h-screen">
                <h1>Ajout d'un déliverable</h1>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Nom du document</span>
                    </label>
                    <input
                        onChange={handleChange}
                        type="text"
                        name="title"
                        placeholder="Ex: Contrat de travail"
                        className="input input-bordered w-full max-w-xs"
                    />
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Fichier</span>
                    </label>
                    <input
                        name="file"
                        onChange={handleChangeFile}
                        type="file"
                        className="file-input file-input-bordered w-full max-w-xs"
                    />
                </div>
                <div className="form-control w-full max-w-xs">
                    <button className="btn w-full max-w-xs mt-4">
                        Enregister
                    </button>
                </div>
            </div>
        </form>
    );
}

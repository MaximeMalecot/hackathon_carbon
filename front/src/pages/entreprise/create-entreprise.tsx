import { useCallback, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import entrepriseService from "../../services/entreprise.service";

export default function CreationEntreprise() {
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        file: null,
    });

    const handleSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            try {
                console.log(formData);
                const { name, address, file } = formData;
                if (!name || !address || !file)
                    throw new Error("Missing field(s)");
                await entrepriseService.create(name, address, file);
            } catch (e: any) {
                console.error(e.message);
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
        <div>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center h-screen">
                    <h1>Création d'une entreprise</h1>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">
                                Nom de l'entreprise
                            </span>
                        </label>
                        <input
                            onChange={handleChange}
                            type="text"
                            name="name"
                            placeholder="Ex: Citya Immobilier"
                            className="input input-bordered w-full max-w-xs"
                        />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">
                                Adresse de l'entreprise
                            </span>
                        </label>
                        <input
                            onChange={handleChange}
                            name="address"
                            type="text"
                            placeholder="Ex: 242 Rue du Faubourg Saint-Antoine, Paris"
                            className="input input-bordered w-full max-w-xs"
                        />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">
                                Image de l'entreprise
                            </span>
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
            <ToastContainer />
        </div>
    );
}

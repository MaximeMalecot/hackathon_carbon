import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Entreprise } from "../../interfaces/entreprise";
import entrepriseService from "../../services/entreprise.service";

export default function EntrepriseView() {
    const params = useParams();
    const [entreprise, setEntreprise] = useState<Entreprise>();
    console.log(params.id);

    const fetchEntreprise = async () => {
        const entreprise = await entrepriseService.getById(params.id);
        setEntreprise(entreprise);
    };

    useEffect(() => {
        fetchEntreprise();
    }, []);

    return (
        <div>
            <div className="flex flex-col items-center h-screen">
                <h1>Entreprise</h1>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">{""}</span>
                    </label>
                    <input
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
        </div>
    );
}

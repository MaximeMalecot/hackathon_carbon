import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormationService from "../../services/formation.service";

export default function CreationFormation() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        level: 200,
    });

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [levels, setLevels] = useState<number[]>([]);

    useEffect(() => {
        if (!isLoading) {
            fetchLevels();
        }
        setIsLoading(false);
    }, [isLoading]);

    const handleSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            let res;
            try {
                const { name, level } = formData;
                if (!name || !level) throw new Error("Missing field(s)");
                res = await FormationService.createFormation({
                    ...formData,
                    level: parseInt(level.toString()),
                });
                if (res._id) {
                    navigate(`/gestion-formations/${res._id}`);
                }
            } catch (e: any) {
                toast.error("Erreur: " + e.message);
            }
            if (!res?.statusCode) {
                console.log("ok");
                setFormData({ name: "", level: 100 });
            }
        },
        [formData, navigate]
    );

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            setFormData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
            }));
        },
        []
    );

    const fetchLevels = async () => {
        const levels = await FormationService.getFormationLevel();
        if (!levels) return;
        setLevels(levels);
    };
    return (
        <div>
            <h1 className="text-4xl mb-5">Création de formation</h1>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center h-screen">
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">
                                Nom de la formation
                            </span>
                        </label>
                        <input
                            onChange={handleChange}
                            type="text"
                            name="name"
                            placeholder="Ex: Formation React"
                            className="input input-bordered w-full max-w-xs"
                            value={formData.name}
                        />
                        {levels.length !== 0 && (
                            <>
                                <label className="label">
                                    <span className="label-text">
                                        Points récompensés
                                    </span>
                                </label>
                                <select
                                    className="select select-primary w-full max-w-xs mb-5"
                                    name="level"
                                    id=""
                                    onChange={handleChange}
                                >
                                    <option defaultValue="">
                                        Choisir un niveau
                                    </option>
                                    {levels.map((level, index) => (
                                        <option key={index} value={level}>
                                            {level}
                                        </option>
                                    ))}
                                </select>
                            </>
                        )}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <button className="btn w-full max-w-xs mt-4">
                            Enregister
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

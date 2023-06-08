import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import FormationService from "../../services/formation.service";

export default function CreationFormation() {
    const [formData, setFormData] = useState({
        name: "",
    });

    const handleSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            let res;
            try {
                console.log(formData);
                const { name } = formData;
                if (!name) throw new Error("Missing field(s)");
                res = await FormationService.createFormation(name);
            } catch (e: any) {
                toast.error("Erreur: " + e.message, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
            if (!res?.statusCode) {
                console.log("ok");
                setFormData({ name: "" });
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
    return (
        <div>
            <h1 className="text-4xl mb-5">Creation de formation</h1>
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

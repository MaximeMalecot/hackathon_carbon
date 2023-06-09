import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Entreprise } from "../../interfaces/entreprise";
import postServices from "../../services/post.services";

export default function CreatePost() {
    const [types, setTypes] = useState<Array<string>>([]);
    const [entreprises, setEntreprises] = useState<Array<Entreprise>>([]);
    const [formData, setFormData] = useState({
        title: "",
        types: [],
        entrepriseId: "",
    });

    const fetchTypes = async () => {
        const types = await postServices.getAllTypes();
        setTypes(types);
    };
    const fetchEntreprises = async () => {
        const entreprises = await postServices.getAllEntreprises();
        setEntreprises(entreprises);
    };

    useEffect(() => {
        fetchTypes();
        fetchEntreprises();
    }, []);

    const handleSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            try {
                const { title, types, entrepriseId } = formData;
                console.log(formData);
                if (!title) throw new Error("Missing field(s)");
                await postServices.create(title, types, entrepriseId);
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

    const handleChangeSelect = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            setFormData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
            }));
        },
        []
    );
    const handleChangeMultipleSelect = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            setFormData((prev) => ({
                ...prev,
                [e.target.name]: [e.target.value],
            }));
        },
        []
    );

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center h-screen">
                    <h1>Création d'un post</h1>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Titre du post</span>
                        </label>
                        <input
                            onChange={handleChange}
                            type="text"
                            name="title"
                            className="input input-bordered w-full max-w-xs"
                        />
                    </div>
                    <div className="form-control w-full max-w-xs  mt-4">
                        <select
                            defaultValue=""
                            name="types"
                            className="select select-bordered"
                            onChange={handleChangeMultipleSelect}
                        >
                            <option disabled value="">
                                Choisissez un type
                            </option>
                            {types.length > 0 &&
                                types.map((type, index) => (
                                    <option key={index}> {type}</option>
                                ))}
                        </select>
                    </div>
                    <div className="form-control w-full max-w-xs  mt-4">
                        <select
                            defaultValue=""
                            name="entrepriseId"
                            className="select select-bordered"
                            onChange={handleChangeSelect}
                        >
                            <option disabled value="">
                                Choisissez une entreprise
                            </option>
                            {entreprises.length > 0 &&
                                entreprises.map((entreprise, index) => (
                                    <option value={entreprise._id} key={index}>
                                        {entreprise.name}
                                    </option>
                                ))}
                        </select>
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

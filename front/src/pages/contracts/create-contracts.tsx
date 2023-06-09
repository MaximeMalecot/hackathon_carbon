import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateContractDto, Entreprise, UserData } from "../../interfaces";
import contractService from "../../services/contract.service";
import entrepriseService from "../../services/entreprise.service";
import userService from "../../services/user.service";

export default function ContractsCreate() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [formData, setFormData] = useState<CreateContractDto>({
        entrepriseId: "",
        position: "",
        userId: "",
        startDate: "",
        endDate: "",
    });
    const [entreprises, setEntreprises] = useState<Entreprise[]>([]);
    const [users, setUsers] = useState<UserData[]>([]);

    const fetchEntreprises = async () => {
        const entreprises = await entrepriseService.getAll();
        setEntreprises(entreprises);
    };

    const fetchUsers = async () => {
        const users = await userService.getUsers();
        setUsers(users);
    };

    const handleSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const res = await contractService.createContract(formData);
            if (!res) return;

            navigate("/contracts");
        },
        [formData]
    );

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
            setFormData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
            }));
        },
        []
    );

    useEffect(() => {
        if (!isLoading) {
            fetchEntreprises();
            fetchUsers();
        }
        setIsLoading(false);
    }, [isLoading]);

    return (
        <>
            {!isLoading ? (
                <div>
                    <h1 className="text-4xl mb-5">Création de contrat</h1>
                    {entreprises.length === 0 ? (
                        <p className="text-red-500">
                            Vous devez créer une entreprise avant de créer un
                            contrat
                        </p>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">
                                        Nom de l'entreprise
                                    </span>
                                </label>
                                <select
                                    className="select select-primary w-full max-w-xs mb-5"
                                    name="entrepriseId"
                                    onChange={handleChange}
                                >
                                    <option defaultValue="">
                                        Choisir une entreprise
                                    </option>
                                    {entreprises.map((entreprise) => (
                                        <option
                                            key={entreprise._id}
                                            value={entreprise._id}
                                        >
                                            {entreprise.name}
                                        </option>
                                    ))}
                                </select>
                                {users.length > 0 && (
                                    <>
                                        <label className="label">
                                            <span className="label-text">
                                                Utilisateur
                                            </span>
                                        </label>
                                        <select
                                            className="select select-primary w-full max-w-xs mb-5"
                                            name="userId"
                                            onChange={handleChange}
                                            value={formData.userId}
                                        >
                                            <option defaultValue="">
                                                Choisir un utilisateur
                                            </option>
                                            {users.map((user) => (
                                                <option
                                                    key={user._id}
                                                    value={user._id}
                                                >
                                                    {user.firstName}{" "}
                                                    {user.lastName}
                                                </option>
                                            ))}
                                        </select>
                                    </>
                                )}
                                {formData.userId && formData.entrepriseId && (
                                    <>
                                        <label className="label">
                                            <span className="label-text">
                                                Nom du poste
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Ex: Développeur web"
                                            className="input input-primary input-bordered mb-5"
                                            name="position"
                                            onChange={handleChange}
                                            value={formData.position}
                                        />
                                        <label className="label">
                                            <span className="label-text">
                                                Date de début
                                            </span>
                                        </label>
                                        <input
                                            type="date"
                                            placeholder="Date de début"
                                            className="input input-primary input-bordered mb-5"
                                            name="startDate"
                                            onChange={handleChange}
                                            value={formData.startDate}
                                        />
                                        <label className="label">
                                            <span className="label-text">
                                                Date de fin
                                            </span>
                                        </label>
                                        <input
                                            type="date"
                                            placeholder="Date de fin"
                                            className="input input-primary input-bordered mb-5"
                                            name="endDate"
                                            onChange={handleChange}
                                            value={formData.endDate}
                                        />
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                        >
                                            Créer le contrat
                                        </button>
                                    </>
                                )}
                            </div>
                        </form>
                    )}
                </div>
            ) : null}
        </>
    );
}

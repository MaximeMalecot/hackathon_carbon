import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import prizeService from "../../services/prize.service";

export default function CreatePrize() {
    const [formData, setFormData] = useState({
        name: "",
        price: 0,
        file: null,
        quantity: 0,
    });

    const handleSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            try {
                console.log(formData);
                const { name, price, file, quantity } = formData;
                if (!name || !price || !file || !quantity)
                    throw new Error("Missing field(s)");

                if (quantity < 0) throw new Error("Quantity must be positive");

                if (price < 0) throw new Error("Price must be positive");

                await prizeService.create(formData);
            } catch (e: any) {
                toast.error("Erreur: " + e.message);
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
                    <h1>Création d'un prix</h1>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Nom du prix</span>
                        </label>
                        <input
                            onChange={handleChange}
                            value={formData.name}
                            name="name"
                            type="text"
                            placeholder="Ex: Bon d'achat de 10€ chez Amazon"
                            className="input input-bordered w-full max-w-xs"
                        />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Nombre de points</span>
                        </label>
                        <input
                            onChange={handleChange}
                            value={formData.price}
                            name="price"
                            type="number"
                            minLength={0}
                            placeholder="Ex: 100"
                            className="input input-bordered w-full max-w-xs"
                        />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Quantité</span>
                        </label>
                        <input
                            onChange={handleChange}
                            value={formData.quantity}
                            name="quantity"
                            type="number"
                            minLength={0}
                            placeholder="Ex: 12"
                            className="input input-bordered w-full max-w-xs"
                        />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Image du lot</span>
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
        </div>
    );
}

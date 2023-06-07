export default function CreationEntreprise() {
    return (
        <div className="flex flex-col items-center h-screen">
            <h1>Création d'une entreprise</h1>
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Nom de l'entreprise</span>
                </label>
                <input
                    type="text"
                    placeholder="Ex: Citya Immobilier"
                    className="input input-bordered w-full max-w-xs"
                />
            </div>
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Adresse de l'entreprise</span>
                </label>
                <input
                    type="text"
                    placeholder="Ex: 242 Rue du Faubourg Saint-Antoine, Paris"
                    className="input input-bordered w-full max-w-xs"
                />
            </div>
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Image de l'entreprise</span>
                </label>
                <input
                    type="file"
                    className="file-input file-input-bordered w-full max-w-xs"
                />
            </div>
            <div className="form-control w-full max-w-xs">
                <button className="btn w-full max-w-xs mt-4">Enregister</button>
            </div>
        </div>
    );
}

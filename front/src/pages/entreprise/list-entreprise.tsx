import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Entreprise } from "../../interfaces/entreprise";
import entrepriseService from "../../services/entreprise.service";

export default function ListEntreprises() {
    const [research, setResearch] = useState<string>("");
    const [entreprises, setEntreprises] = useState<Array<Entreprise>>([]);
    const [entreprisesFiltered, setEntreprisesFiltered] = useState<
        Entreprise[]
    >([]);
    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setResearch(e.target.value);
        },
        []
    );

    const fetchEntreprises = async () => {
        const entreprises = await entrepriseService.getAll();
        setEntreprises(entreprises);
    };

    useEffect(() => {
        fetchEntreprises();
    }, []);

    useEffect(() => {
        filteredEntreprises();
    }, [research, entreprises]);

    const filteredEntreprises = useCallback(() => {
        const filteredEntreprises: Entreprise[] = entreprises.filter(
            (entreprise) =>
                entreprise.address
                    .toLowerCase()
                    .includes(research.toLowerCase()) ||
                entreprise.name.toLowerCase().includes(research.toLowerCase())
        );
        setEntreprisesFiltered(filteredEntreprises);
    }, [research, entreprises]);

    return (
        <div className="entreprise-liste">
            <h1 className="text-4xl mb-5">Liste des entreprises</h1>
            <input
                type="text"
                placeholder="Type here"
                className="input input-bordered input-info input-md w-full max-w-xs mb-5"
                value={research}
                onChange={handleChange}
            />
            <section className="grid xl:grid-cols-3 sm:grid-cols-2 gap-4">
                {entreprisesFiltered.length > 0 &&
                    entreprisesFiltered.map((entreprise, index) => (
                        <Link
                            to=""
                            key={index}
                            className="card max-w-sm w-auto bg-base-100 shadow-xl"
                        >
                            <figure>
                                <img
                                    src="https://media.foot-national.com/18/2023/06/photo_article/825003/328818/1200-L-quipe-de-france-didier-deschamps-recadr-par-la-real-sociedad.jpg"
                                    alt="entreprise image"
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">
                                    {entreprise.name}
                                </h2>
                                <p>{entreprise.address}</p>
                            </div>
                        </Link>
                    ))}
            </section>
            <div className="join mt-5">
                <button className="join-item btn btn-active" disabled>
                    1
                </button>
                <button className="join-item btn">2</button>
                <button className="join-item btn">3</button>
                <button className="join-item btn">4</button>
            </div>
        </div>
    );
}

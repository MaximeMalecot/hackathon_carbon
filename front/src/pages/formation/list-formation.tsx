import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Formation } from "../../interfaces";
import FormationService from "../../services/formation.service";
import { mapperFormation } from "../../helpers";

export default function ListFormation() {
    const [research, setResearch] = useState<string>("");
    const [formations, setFormations] = useState<Formation[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [formationsFiltered, setFormationsFiltered] = useState<Formation[]>(
        []
    );
    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setResearch(e.target.value);
        },
        []
    );
    const fetchFormations = useCallback(async () => {
        const response = await FormationService.getFormations();
        if (response) {
            const values = response.map((element) => {
                return mapperFormation(element);
            });
            setFormations(values);
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchFormations();
    }, []);

    useEffect(() => {
        filteredFormations();
    }, [research, formations]);

    const filteredFormations = useCallback(() => {
        const filteredFormations: Formation[] = formations.filter((formation) =>
            formation?.title?.toLowerCase().includes(research.toLowerCase())
        );
        setFormationsFiltered(filteredFormations);
    }, [formations, research]);

    return (
        <div className="formation-liste">
            <h1 className="text-4xl mb-5">Liste des formations</h1>
            <input
                type="text"
                placeholder="Type here"
                className="input input-bordered input-info input-md w-full max-w-xs mb-5"
                value={research}
                onChange={handleChange}
            />
            <section className="grid xl:grid-cols-3 sm:grid-cols-2 gap-4">
                {formationsFiltered.map((formation, index) => (
                    <div
                        key={index}
                        className="card max-w-sm w-auto bg-base-100 shadow-xl"
                    >
                        <figure>
                            <img src={formation.image} alt="Formation image" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{formation.title}</h2>
                            <div className="card-actions justify-end">
                                <div className="stat p-0">
                                    <div className="stat-value text-success">
                                        {formation.xp}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            className="inline-block w-8 h-8 stroke-current"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 10V3L4 14h7v7l9-11h-7z"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>
                                <Link
                                    to={`/formation/${formation.id}`}
                                    className="btn btn-info text-neutral"
                                >
                                    Go
                                </Link>
                            </div>
                        </div>
                    </div>
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

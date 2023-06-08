import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FormationService from "../../services/formation.service";

export const DisplayChapters = () => {
    const params = useParams<{ id: string }>();
    const [formations, setFormations] = useState([]);
    const fetchChapters = async () => {
        const response = await FormationService.getFormationChapters(
            params?.id ?? ""
        );
        if (response.length > 0) {
            console.log(response);
            setFormations(response);
        }
        // if (response) {
        //     const values = response.map((element) => {
        //         return mapperFormation(element);
        //     });
        //     setFormations(values);
        //     setIsLoading(false);
        // }
    };
    useEffect(() => {
        fetchChapters();
        console.log("DisplayChapters");
    }, []);
    return (
        <section className="grid xl:grid-cols-3 sm:grid-cols-2 gap-4 mt-5">
            {formations.map((formation, index) => (
                <div
                    key={index}
                    className="card max-w-sm w-auto bg-base-100 shadow-xl"
                >
                    <div className="card-body">
                        <h2 className="card-title">
                            Chapitre : {formation?.name}
                        </h2>
                        <p className="card-actions">{formation?.type}</p>
                        <div className="card-actions justify-end">
                            <Link to={`/gestion-formations/quiz/${formation?._id}`}>
                                <button className="btn btn-primary">
                                    Voir le chapitre
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
};

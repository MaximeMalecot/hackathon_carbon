import { useEffect, useState } from "react";
import { Content } from "../../interfaces/content";
import { Entreprise } from "../../interfaces/entreprise";
import entrepriseService from "../../services/entreprise.service";

export function Post(props: {
    title: string;
    content: Array<Content>;
    types: string;
    writer?: string;
    enterprise?: string;
    createdAt: string;
}) {
    const [entreprise, setEntreprise] = useState<Entreprise>();

    const fetchEntreprise = async (entrepriseId: string) => {
        const entreprise = await entrepriseService.getOne(entrepriseId);
        setEntreprise(entreprise);
    };

    useEffect(() => {
        if (!props.enterprise) return;
        fetchEntreprise(props.enterprise);
    }, []);

    const sortContents = props.content.sort(function (a, b) {
        return a.order - b.order;
    });
    return (
        <div className="card w-1/2 bg-base-100 shadow-xl border">
            <div className="card-body">
                <h2 className="card-title">{props.title}</h2>
                {entreprise && <p>Entreprise: {entreprise?.name}</p>}
            </div>
            {sortContents.map((content) => {
                if (content.type === "text") {
                    return <p>{content.data}</p>;
                } else if (content.type === "file") {
                    return (
                        <figure className="">
                            <img
                                className="w-full max-h-80 object-cover"
                                src={content.data}
                                alt={props.title}
                            />
                        </figure>
                    );
                }
            })}
            <div className="flex justify-between">
                <div>{props.writer}</div>
                <div>{props.createdAt}</div>
            </div>
        </div>
    );
}

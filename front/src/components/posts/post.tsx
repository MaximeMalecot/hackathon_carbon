import { useEffect, useState } from "react";
import { Content } from "../../interfaces/content";
import { Entreprise } from "../../interfaces/entreprise";
import entrepriseService from "../../services/entreprise.service";
import postServices from "../../services/post.services";

export function Post(props: {
    id: string;
    title: string;
    types: string;
    writer?: string;
    enterprise?: string;
    createdAt: string;
}) {
    const [entreprise, setEntreprise] = useState<Entreprise>();
    const [contents, setContents] = useState<Array<Content>>([]);

    const fetchEntreprise = async (entrepriseId: string) => {
        const entreprise = await entrepriseService.getOne(entrepriseId);
        setEntreprise(entreprise);
    };

    const fetchPostContent = async (postId: string) => {
        const contents = await postServices.getPostContentByPostId(postId);
        setContents(contents);
    };

    useEffect(() => {
        fetchPostContent(props.id);
        if (!props.enterprise) return;
        fetchEntreprise(props.enterprise);
    }, []);

    const sortContents = contents.sort(function (a, b) {
        return a.order - b.order;
    });

    return (
        <div className="card w-1/2 bg-base-100 shadow-xl border p-2 my-2">
            {entreprise && <p>Entreprise: {entreprise?.name}</p>}
            <h1 className="text-center my-3">{props.title}</h1>
            {contents?.length > 0 &&
                sortContents.map((content, index) => {
                    return (
                        <div key={index}>
                            {content.type === "text" ? (
                                <p className="my-1">{content.data}</p>
                            ) : (
                                <figure className="my-1">
                                    <img
                                        className="w-full max-h-80 object-cover"
                                        src={content.data}
                                        alt={props.title}
                                    />
                                </figure>
                            )}
                        </div>
                    );
                })}
            <div className="flex justify-between">
                <div>{props.writer}</div>
                <div className="">
                    {new Date(props.createdAt).toLocaleDateString()}
                </div>
            </div>
        </div>
    );
}

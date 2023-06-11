import { useCallback, useEffect, useState } from "react";
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

    const t = (
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

    const image = useCallback(() => {
        const element = contents.find((content) => content.type === "file");

        if (element) {
            return element.data;
        } else {
            return "https://images.unsplash.com/photo-1686276476863-687665119815?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80";
        }
    }, [contents]);

    const firstContentText = useCallback(() => {
        const element = contents.find((content) => content.type === "text");

        if (element) {
            return element.data;
        } else {
            return "No content text";
        }
    }, [contents]);

    return (
        <div className="card max-w-sm w-auto bg-base-100 shadow-xl h-80 cursor-pointer hover:scale-105 transition-5 transition">
            <figure style={{ height: "200px", width: "100%" }}>
                <img src={image()} alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="text-2xl card-title">{props.title}</h2>
                <p>{firstContentText()}</p>
            </div>
        </div>
    );
}

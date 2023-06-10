import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ContentDto } from "../../interfaces/dto/content.dto";
import { Entreprise } from "../../interfaces/entreprise";
import postContentService from "../../services/post-content.service";
import postServices from "../../services/post.services";

export default function CreatePost() {
    const navigate = useNavigate();
    const [types, setTypes] = useState<Array<string>>([]);
    const [entreprises, setEntreprises] = useState<Array<Entreprise>>([]);
    const [formData, setFormData] = useState({
        title: "",
        types: [],
        entrepriseId: "",
    });
    const [contents, setContents] = useState<Array<ContentDto>>([]);

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

    const handleSubmit = useCallback(async () => {
        try {
            const { title, types, entrepriseId } = formData;
            console.log(formData);
            console.log(contents);
            if (!title) throw new Error("Missing field(s)");

            const post = await postServices.create(title, types, entrepriseId);
            if (!post || !post._id)
                throw new Error("Error while creating post");
            contents.forEach(async (content) => {
                if (content.type === "text") {
                    await postContentService.postContentText(post._id, content);
                } else if (content.type === "file") {
                    await postContentService.postContentFile(post._id, content);
                }
            });
            navigate("/gestion-posts");
        } catch (e: any) {
            toast.error("Erreur: " + e.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    }, [formData, contents]);

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

    const addContent = useCallback((type: "text" | "file") => {
        setContents((prev) => [
            ...prev,
            { type, data: "", order: prev.length },
        ]);
    }, []);

    const deleteContent = useCallback(
        (index: number) => {
            setContents((prev) =>
                prev.filter((content) => content.order !== index)
            );
        },
        [contents]
    );

    const handleChangeFile = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
            const content = contents.find((content) => content.order === index);
            if (!content) return;
            if (!e.target.files?.[0]) return;
            content.data = e.target.files?.[0];
            setContents((prev) => {
                const newContents = [...prev];
                newContents[content.order] = content;
                return newContents;
            });
        },
        [contents]
    );

    const handleChangeText = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
            const content = contents.find((content) => content.order === index);
            console.log(content);
            if (!content) return;
            content.data = e.target.value;
            setContents((prev) => {
                const newContents = [...prev];
                newContents[content.order] = content;
                return newContents;
            });
        },
        [contents]
    );

    return (
        <div>
            <form onSubmit={(e) => e.preventDefault()}>
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
                    <div className="form-control w-full max-w-xs mt-4">
                        {contents.length > 0 && (
                            <>
                                Contents
                                {contents.map((content, index) =>
                                    content.type === "text" ? (
                                        <div
                                            key={index}
                                            className="w-full max-w-xs flex"
                                        >
                                            <input
                                                type="text"
                                                name="data"
                                                onChange={(e) =>
                                                    handleChangeText(
                                                        e,
                                                        content.order
                                                    )
                                                }
                                                className="input input-bordered w-full max-w-xs flex-2"
                                            />
                                            <button
                                                className="btn btn-error btn-sm mt-2 flex-1"
                                                onClick={(e) =>
                                                    deleteContent(content.order)
                                                }
                                            >
                                                X
                                            </button>
                                        </div>
                                    ) : (
                                        <div
                                            key={index}
                                            className="w-full max-w-xs flex"
                                        >
                                            <input
                                                name="data"
                                                onChange={(e) =>
                                                    handleChangeFile(
                                                        e,
                                                        content.order
                                                    )
                                                }
                                                type="file"
                                                className="file-input file-input-bordered max-w-xs flex-2"
                                            />
                                            <button
                                                className="btn btn-error btn-sm mt-2 flex-1"
                                                onClick={(e) =>
                                                    deleteContent(content.order)
                                                }
                                            >
                                                X
                                            </button>
                                        </div>
                                    )
                                )}
                            </>
                        )}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <button
                            className="btn w-full max-w-xs mt-2"
                            onClick={(e) => addContent("text")}
                        >
                            Add text
                        </button>
                        <button
                            className="btn w-full max-w-xs mt-2"
                            onClick={(e) => addContent("file")}
                        >
                            Add image
                        </button>
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <button
                            className="btn w-full max-w-xs mt-4"
                            onClick={(e) => handleSubmit()}
                        >
                            Enregister
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

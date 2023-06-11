import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UpdateContentDto } from "../../interfaces/dto/update-content.dto";
import { PostData } from "../../interfaces/post";
import postContentService from "../../services/post-content.service";
import postServices from "../../services/post.services";

export default function EditPost() {
    const { id } = useParams();
    const [post, setPost] = useState<PostData>();
    const [contents, setContents] = useState<Array<UpdateContentDto>>([]);

    const fetchPost = async (postId: string) => {
        const post = await postServices.getOne(postId);
        const contents = await postServices.getContents(postId);
        setPost(post);
        setContents(contents);
    };

    useEffect(() => {
        if (!id) return;
        fetchPost(id);
    }, []);

    const handleSubmit = useCallback(async () => {
        try {
            if (!post) return;
            contents.forEach(async (content) => {
                if (content._id) return;
                if (content.type === "text") {
                    await postContentService.postContentText(post._id, content);
                } else if (content.type === "file") {
                    await postContentService.postContentFile(post._id, content);
                }
                fetchPost(post._id);
            });
        } catch (e: any) {
            toast.error("Erreur: " + e.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    }, [post, contents]);

    const addContent = useCallback((type: "text" | "file") => {
        setContents((prev) => [
            ...prev,
            { type, data: "", order: prev.length },
        ]);
    }, []);

    const deleteContent = useCallback((index: number) => {
        setContents((prev) =>
            prev.filter((content) => content.order !== index)
        );
    }, []);

    const deleteDistantContent = useCallback(
        async (index: number) => {
            if (!id) return;
            const content = contents.find((content) => content.order === index);
            if (!content || !content._id) return;
            await postContentService.delete(content._id);
            fetchPost(id);
        },
        [contents, id]
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
            e.preventDefault();
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
                    <h1 className="text-xl font-bold">
                        Modification d'un post
                    </h1>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">
                                <span className="font-bold uppercase">
                                    Titre:
                                </span>
                                {post?.title}
                            </span>
                        </label>
                    </div>
                    {post?.types && post?.types.length > 0 && (
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">
                                    <span className="font-bold uppercase">
                                        Types :
                                    </span>
                                    {JSON.stringify(post?.types)}
                                </span>
                            </label>
                        </div>
                    )}
                    {post?.enterprise && (
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">
                                    Entreprise : {post?.enterprise}
                                </span>
                            </label>
                        </div>
                    )}
                    <div className="form-control w-full max-w-xs mt-4">
                        {contents.length > 0 && (
                            <>
                                <span className="font-bold uppercase">
                                    Contents :
                                </span>
                                {contents.map((content, index) => (
                                    <PostContentItem
                                        content={content}
                                        key={index}
                                        deleteDistantContent={
                                            deleteDistantContent
                                        }
                                        handleChangeText={handleChangeText}
                                        deleteContent={deleteContent}
                                        handleChangeFile={handleChangeFile}
                                    />
                                ))}
                            </>
                        )}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <div
                            className="btn w-full max-w-xs mt-2"
                            onClick={(e) => addContent("text")}
                        >
                            Add text
                        </div>
                        <div
                            className="btn w-full max-w-xs mt-2"
                            onClick={(e) => addContent("file")}
                        >
                            Add image
                        </div>
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <button
                            className="btn w-full max-w-xs mt-4"
                            onClick={(e) => {
                                e.preventDefault();
                                handleSubmit();
                            }}
                        >
                            Enregister
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

interface PostContentItemProps {
    deleteDistantContent: (index: number) => void;
    handleChangeText: (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => void;
    deleteContent: (index: number) => void;
    handleChangeFile: (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => void;
    content: any;
}

function PostContentItem({
    deleteDistantContent,
    handleChangeText,
    deleteContent,
    handleChangeFile,
    content,
}: PostContentItemProps) {
    useEffect(() => {
        console.log("content changed");
    }, [content]);

    if (content._id) {
        if (content.type === "text") {
            return (
                <div className="w-full">
                    <p className="my-2">
                        {typeof content.data === "string" && content.data}
                    </p>
                    <div
                        className="btn btn-error btn-sm m-auto w-full"
                        onClick={(e) => deleteDistantContent(content.order)}
                    >
                        Supprimer texte
                    </div>
                </div>
            );
        }
        if (content.type === "file") {
            return (
                <figure className="w-full">
                    <img
                        className="w-full max-h-80 object-cover my-2"
                        src={
                            typeof content.data === "string"
                                ? content.data
                                : URL.createObjectURL(content.data)
                        }
                    />
                    <div
                        className="btn btn-error btn-sm w-full"
                        onClick={(e) => deleteDistantContent(content.order)}
                    >
                        Supprimer image
                    </div>
                </figure>
            );
        }
    }

    if (content.type === "text") {
        return (
            <div className="w-full">
                <input
                    type="text"
                    name="data"
                    value={content.data}
                    onChange={(e) => handleChangeText(e, content.order)}
                    className="input input-bordered w-full max-w-xs my-2"
                />
                <div
                    className="btn btn-error btn-sm mt-2 w-full"
                    onClick={(e) => deleteContent(content.order)}
                >
                    X
                </div>
            </div>
        );
    }

    if (content.type === "file") {
        return (
            <div className="w-full">
                <input
                    name="data"
                    onChange={(e) => handleChangeFile(e, content.order)}
                    type="file"
                    className="file-input file-input-bordered max-w-xs my-2"
                />
                <div
                    className="btn btn-error btn-sm mt-2 my-2 w-full"
                    onClick={(e) => deleteContent(content.order)}
                >
                    X
                </div>
            </div>
        );
    }
}

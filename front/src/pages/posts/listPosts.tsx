import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PostData } from "../../interfaces/post";
import postServices from "../../services/post.services";

export default function ListPosts() {
    const [research, setResearch] = useState<string>("");
    const [posts, setPosts] = useState<any>([]);
    const [postsFiltered, setPostsFiltered] = useState<PostData[]>([]);
    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setResearch(e.target.value);
        },
        []
    );
    const fetchPosts = async () => {
        const posts = await postServices.getAll();
        setPosts(posts);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        filteredPosts();
    }, [research, posts]);

    const publish = useCallback(async (id: string) => {
        await postServices.publish(id);
        fetchPosts();
    }, []);

    const filteredPosts = useCallback(() => {
        const filteredPosts: PostData[] = posts.filter(
            (post: PostData) =>
                post.title?.toLowerCase().includes(research.toLowerCase()) ||
                post.writer?.toLowerCase().includes(research.toLowerCase()) ||
                post.enterprise?.toLowerCase().includes(research.toLowerCase())
        );
        setPostsFiltered(filteredPosts);
    }, [research, posts]);

    return (
        <div className="post-liste">
            <h1 className="text-4xl mb-5">Liste des posts</h1>
            <div className="flex justify-between">
                <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs mb-5"
                    value={research}
                    onChange={handleChange}
                />
                <Link to="/gestion-posts/create" className="btn">
                    Créer un post
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Titre</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {postsFiltered.map((post, index) => (
                            <tr className="hover" key={index}>
                                <th></th>
                                <td>{post.title}</td>
                                <td>
                                    {post.status === "DRAFT" ? (
                                        <button className="btn btn-warning text-neutral">
                                            DRAFT
                                        </button>
                                    ) : (
                                        <button className="btn btn-success">
                                            PUBLISHED
                                        </button>
                                    )}
                                </td>
                                <td>
                                    {new Date(
                                        post.createdAt
                                    ).toLocaleDateString()}
                                </td>
                                <td>
                                    <Link
                                        to={`/gestion-posts/edit/${post._id}`}
                                        className="btn btn-primary"
                                    >
                                        Edit
                                    </Link>
                                    {post.status === "DRAFT" ? (
                                        <button
                                            className="btn btn-warning ml-2 text-neutral"
                                            onClick={(e) => publish(post._id)}
                                        >
                                            Publish
                                        </button>
                                    ) : null}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
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

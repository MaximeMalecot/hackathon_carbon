import { useEffect, useState } from "react";
import { Post } from "../components/posts/post";
import { PostData } from "../interfaces/post";
import postServices from "../services/post.services";

export default function Home() {
    const [posts, setPosts] = useState<Array<PostData>>([]);

    const fetchPosts = async () => {
        const posts = await postServices.getAll();
        setPosts(posts);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center">
            {posts.map((post: PostData, index) => (
                <Post
                    key={index}
                    id={post._id}
                    title={post.title}
                    types={post.types}
                    createdAt={post.createdAt}
                    enterprise={post.enterprise}
                />
            ))}
        </div>
    );
}

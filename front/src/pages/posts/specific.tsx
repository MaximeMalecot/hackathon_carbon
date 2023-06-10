import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Post as PostComponent } from "../../components/posts/post";
import { Content } from "../../interfaces/content";
import { PostData } from "../../interfaces/post";
import postServices from "../../services/post.services";

export default function SpecificPost() {
    const { id } = useParams();
    const [post, setPost] = useState<PostData | null>(null);
    const [contents, setContents] = useState<Content[]>([]);
    const navigate = useNavigate();

    const fetchPost = async (postId: string) => {
        const postRes = await postServices.getOne(postId);
        if (!postRes) navigate("/posts");
        const contents = await postServices.getContents(postId);
        setPost(post);
        setContents(contents);
    };

    useEffect(() => {
        if (!id) return;
        fetchPost(id);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center">
            {post && (
                <PostComponent
                    title={post.title}
                    types={post.types}
                    content={contents}
                    createdAt={post.createdAt}
                />
            )}
        </div>
    );
}

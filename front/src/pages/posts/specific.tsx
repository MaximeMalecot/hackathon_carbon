import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post as PostComponent } from "../../components/posts/post";
import { Content } from "../../interfaces/content";
import { Post } from "../../interfaces/post";
import postServices from "../../services/post.services";

export default function SpecificPost() {
    const { id } = useParams();
    const [post, setPost] = useState<Post>();
    const [contents, setContents] = useState<Content[]>([]);

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

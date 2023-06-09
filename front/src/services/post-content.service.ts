import { API_ENDPOINT } from "../constants";
import { ContentDto } from "../interfaces/dto/content.dto";
import authHeader from "./auth.header";

class PostContentService {
    async postContentText(postId: string, body: ContentDto) {
        const res = await fetch(
            `${API_ENDPOINT}/posts-content/${postId}/text`,
            {
                method: "POST",
                headers: {
                    ...authHeader(),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            }
        );
        return await res.json();
    }
    async postContentFile(postId: string, body: ContentDto) {
        const data = new FormData();
        data.append("data", body.data);
        data.append("type", "file");
        data.append("order", body.order.toString());
        const res = await fetch(
            `${API_ENDPOINT}/posts-content/${postId}/image`,
            {
                method: "POST",
                headers: {
                    ...authHeader(),
                },
                body: data,
            }
        );
        return await res.json();
    }
}

export default new PostContentService();

import { Content } from "./content";
export interface Post {
    _id: string;
    title: string;
    content: Array<Content>;
    type: string;
    writer: string;
    createdAt: string;
    enterprise: string;
    status: string;
}

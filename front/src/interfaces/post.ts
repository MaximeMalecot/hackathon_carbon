import { Content } from "./content";
export interface Post {
    id: string;
    title: string;
    content: Array<Content>;
    writer: string;
    createAt: string;
    enterprise: string;
    status: string;
}

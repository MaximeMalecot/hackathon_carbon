import { Content } from "./content";
export interface PostData {
    _id: string;
    title: string;
    content: Array<Content>;
    types: string;
    writer: string;
    createdAt: string;
    enterprise: string;
    status: string;
}

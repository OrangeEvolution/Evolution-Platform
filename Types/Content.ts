import { Category } from "./Category";
import { ContentTpe } from "./ContentType";

export type Content={
    id: number;
    description: string;
    link: string;
    partner: string;
    durationInMinutes: number;
    category: Category; 
    contentType: number;
    progress: number;
    progressEnum: string;
}
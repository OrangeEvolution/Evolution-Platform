import { Category } from "./Category";

export type Trail = {
    id: number;
    name: string;
    description: string;
    mounted_by: string;
    categories: Category[];
}
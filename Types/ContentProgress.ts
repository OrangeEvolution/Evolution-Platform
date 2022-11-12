import { Content } from "./Content";
import { User } from "./User";

export type ContentProgress = {
    content: Content;
    user: User;
    status: string;
    id: number;
}
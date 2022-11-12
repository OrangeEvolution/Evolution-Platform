import { Trail } from "./Trail";

export type User = {
    id: number;
    userName: string;
    fullName: string;
    password: string;
    trails: Trail[];
}
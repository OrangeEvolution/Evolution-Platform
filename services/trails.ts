import { api } from "./api";

export async function createTrails(name: string, description: string, mounted_by: string) {
    try {
        let res = await api.post(`/trails`, {name, description, mounted_by});

        if(res.data) {
            return res.data;
        }
    } catch (error) {
        return null;
    }
}
import { api } from "./api";

export async function signup(userName: string, fullName: string, password: string) {
    try {
        let res = await api.post('/auth/signup', { userName, fullName, password });

        if (res.status == 200) {
            return res.data;
        }
    } catch (error) {
        return error;
    }
}
export async function signin(userName: string, password: string) {
    try {
        let res = await api.post('/auth/signin', { userName, password });

        if (res.status == 200) {
            return res.data;
        }
    } catch (error) {
        return error;
    }
}


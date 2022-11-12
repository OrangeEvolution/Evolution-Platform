import { api } from "./api";

export async function create(content: object) {
    try {
        let res = await api.post(`/api/content/`, content);

        if (res.data) {
            return res.data;
        }
    } catch (error) {
        return null;
    }
}
export async function findById(id: number) {
    try {
        let res = await api.get(`/api/content/${id}`)

        if (res.data) {
            return res.data;
        }
    } catch (error) {
        return error;
    }

}
export async function findAll() {
    try {
        let params = "/api/content/"
        let res = await api.get(params)

        if (res.data) {
            return res.data;
        }
    } catch (error) {
        return error;
    }
}
export async function update(id: number, content: object) {
    try {
        let res = await api.put(`/api/content/${id}`, content)

        if (res.data) {
            return res.data;
        }
    } catch (error) {
        return error;
    }

}
export async function deleteContent(id: number) {
    try {
        let res = await api.delete(`/api/content/${id}`)

        if (res.data) {
            return res.data;
        }
    } catch (error) {
        return error;
    }
}


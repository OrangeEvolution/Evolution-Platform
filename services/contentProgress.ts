import { api } from "./api";

export async function create(progress: object) {
    try {
        let res = await api.post(`/api/progress/`, progress);

        if (res.data) {
            return res.data;
        }
    } catch (error) {
        return null;
    }
}
export async function findById(id: number) {
    try {
        let res = await api.get(`/api/progress/${id}`)

        if (res.data) {
            return res.data;
        }
    } catch (error) {
        return error;
    }

}
export async function findAll() {
    try {
        let params = "/api/progress/"
        let res = await api.get(params)

        if (res.data) {
            return res.data;
        }
    } catch (error) {
        return error;
    }
}
export async function update(id: number, progress: object) {
    try {
        let res = await api.put(`/api/progress/${id}`, progress)

        if (res.data) {
            return res.data;
        }
    } catch (error) {
        return error;
    }

}
export async function deleteProgress(id: number) {
    try {
        let res = await api.delete(`/api/progress/${id}`)

        if (res.data) {
            return res.data;
        }
    } catch (error) {
        return error;
    }
}


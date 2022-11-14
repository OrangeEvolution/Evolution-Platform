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
export async function findContentId(id: number,token:string) {
    try {
        let res = await api.get(`/api/progress/content/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if (res.data) {
            return res.data;
        }
    } catch (error) {
        return error;
    }

}
export async function findAll(token: String) {
    try {
        let params = "/api/progress/"
        let res = await api.get(params, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if (res.data) {
            return res.data;
        }
    } catch (error) {
        return error;
    }
}
export async function updateProgress(id: number, progress: object, token: string) {
    try {
        let res = await api.put(`/api/progress/${id}`, progress, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

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


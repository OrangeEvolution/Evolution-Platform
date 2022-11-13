import { api } from "./api";


export async function create(contentType: object) {
    try {
        let res = await api.post(`/api/content-type/`, contentType);

        if (res.data) {
            return res.data;
        }
    } catch (error) {
        return null;
    }
}
export async function findById(id: number) {
    try {
        let res = await api.get(`/api/content-type/${id}`)

        if (res.data) {
            return res.data;
        }
    } catch (error) {
        return error;
    }

}
export async function findAll(token: string) {
    try {
        let params = "/api/content-type/"
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
export async function update(id: number, contentType: object) {
    try {
        let res = await api.put(`/api/content-type/${id}`, contentType)

        if (res.data) {
            return res.data;
        }
    } catch (error) {
        return error;
    }

}
export async function deleteContentType(id: number) {
    try {
        let res = await api.delete(`/api/content-type/${id}`)

        if (res.data) {
            return res.data;
        }
    } catch (error) {
        return error;
    }
}

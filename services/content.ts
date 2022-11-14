import { api } from "./api";

export async function create(content: object, token: string) {
    try {
        let res = await api.post(`/api/content`, content, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        });

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
export async function findAll(token: string) {
    try {
        let params = "/api/content/"
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
export async function update(id: number, content: object,token: string) {
    try {
        let res = await api.put(`/api/content/${id}`, content, {
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


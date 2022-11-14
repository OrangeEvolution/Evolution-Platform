import { api } from "./api";


export async function createCategory(category: object, token:string) {
    try {
        let res = await api.post(`/api/category/`, category,{
            headers: {
              'Authorization': `Bearer ${token}`
            }
        })

        if (res.data) {
            return res.data;
        }
    } catch (error) {
        return null;
    }
}
export async function findById(id: number) {
    try {
        let res = await api.get(`/api/category/${id}`)

        if (res.data) {
            return res.data;
        }
    } catch (error) {
        return error;
    }

}
export async function findAll(token: string) {
    try {
        let params = "/api/category/"
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
export async function update(id: number, category: object, token:string) {
    try {
        let res = await api.put(`/api/category/${id}`, category,{
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
export async function deleteCategory(id: number) {
    try {
        let res = await api.delete(`/api/category/${id}`)

        if (res.data) {
            return res.data;
        }
    } catch (error) {
        return error;
    }
}

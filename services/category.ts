import { api } from "./api";


export async function createCategory(category: object) {
    try {
        let res = await api.post(`/api/category/`, category);

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
export async function findAll() {
    try {
        let params = "/api/category/"
        let res = await api.get(params)

        if (res.data) {
            return res.data;
        }
    } catch (error) {
        return error;
    }
}
export async function update(id: number, category: object) {
    try {
        let res = await api.put(`/api/category/${id}`, category)

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
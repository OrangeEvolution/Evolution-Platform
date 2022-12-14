import { api } from "./api";

export async function createTrails(name: string, description: string, mounted_by: string, token: string) {
    try {
        let res = await api.post(`/api/trails/`, { name, description, mounted_by }, {
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
export async function findById(id: number, token: string) {
    try {
        let res = await api.get(`/api/trails/${id}`, {
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
export async function findAll(token: string) {
    try {
        let params = "/api/trails/"
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
export async function update(id: number, trail: object) {
    try {
        let res = await api.put(`/api/trails/${id}`, trail)

        if (res.data) {
            return res.data;
        }
    } catch (error) {
        return error;
    }

}
export async function deleteTrail(id: number) {
    try {
        let res = await api.delete(`/api/trails/${id}`)

        if (res.data) {
            return res.data;
        }
    } catch (error) {
        return error;
    }
}
export async function addCategoryToTrail(idTrail: number, idCategory: number, token: string) {
    try {
        let res = await api.patch(`/api/trails/addcategory/${idTrail}/${idCategory}`, '', {
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
export async function removeCategoryToTrail(idTrail: number, idCategory: number) {
    try {
        let res = await api.patch(`/api/trails/removecategory/${idTrail}/${idCategory}`)

        if (res.data) {
            return res.data;
        }
    } catch (error) {
        return error;
    }

}

export async function findFullTrailByIdAndProgress(id: number, token: string) {
    try {
        let res = await api.get(`/api/trails/findfullProgress/${id}`, {
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
export async function findFullTrailById(id: number, token: string) {
    try {
        let res = await api.get(`/api/trails/findfull/${id}`, {
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

import { api } from "./api";

export async function registerUser(userName: string, fullName: string, password: string) {
    try {
        let res = await api.post('/auth/signup', { userName, fullName, password });

        if (res.status == 200) {
            return res.data;
        }
    } catch (error) {
        return error;
    }
}
export async function findById(id: number, token: string) {
    try {
        let res = await api.get(`/api/user/${id}`, {
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
export async function findAll() {
    try {
        let params = "/api/user/"
        let res = await api.get(params)

        if (res.data) {
            return res.data;
        }
    } catch (error) {
        return error;
    }
}
export async function update(id: number, trail: object) {
    try {
        let res = await api.put(`/api/user/${id}`, trail)

        if (res.data) {
            return res.data;
        }
    } catch (error) {
        return error;
    }

}
export async function deleteUser(id: number) {
    try {
        let res = await api.delete(`/api/user/${id}`)

        if (res.data) {
            return res.data;
        }
    } catch (error) {
        return error;
    }
}
export async function addTrailToUser(idTrail: number, token: string) {
    try {
        let res = await api.patch(`/api/user/addtrail/${idTrail}`, '', {
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
export async function removeTrailToUser(idTrail: number) {
    try {
        let res = await api.patch(`/api/user/removetrail/${idTrail}`)

        if (res.data) {
            return res.data;
        }
    } catch (error) {
        return error;
    }

}
export async function findFullTrailById(id: number, token: string) {
    try {
        let res = await api.get(`/api/user/findfull/${id}`, {
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
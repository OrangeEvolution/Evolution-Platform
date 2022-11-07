import axios from "axios";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0ZUB0ZXN0ZSIsInJvbGVzIjpbIkNPTU1PTl9VU0VSIl0sImlhdCI6MTY2Nzg0MTUzNSwiZXhwIjoxNjY3ODQ1MTM1fQ.HT-H5oXJM020v6Ffd_YzXlK-nOxX_PFjsmWCAv8rkTA'
    }
});
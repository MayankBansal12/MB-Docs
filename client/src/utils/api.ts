import axios from "axios";

const backend = import.meta.env.VITE_SERVER;

const makeRequest = async (method = "GET", endpoint: string, data = null) => {
    const token = localStorage.getItem("token");
    if (!token) {
        (window as any).location = "/login"
    }
    try {
        const config = {
            method: method,
            url: backend + endpoint,
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
            data: data || null
        }
        const result = await axios(config);
        return result;
    } catch (error: any) {
        if (error.response.data.token === false) {
            (window as any).location = "/login"
        }
        if (error.response.data.valid === false) {
            localStorage.removeItem("token");
            (window as any).location = "/login"
        }
        return error;
    }
}

export default makeRequest;
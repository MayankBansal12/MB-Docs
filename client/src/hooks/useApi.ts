import axios from "axios";
import { useSetRecoilState } from "recoil";
import { loadingAtom } from "../atom/loading";

const backend = import.meta.env.VITE_SERVER;

const useApi = () => {
    const setLoading = useSetRecoilState(loadingAtom);

    // Func for making request to the backend server
    const makeRequest = async (method = "GET", endpoint: string, data: Object | null = null) => {
        const token = localStorage.getItem("token");
        const path = window.location.pathname.split('/').pop();

        if (!token) {
            (window as any).location = `/login?redirect=${path}`
        }
        setLoading(true);
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
            setLoading(false);
            return result;
        } catch (error: any) {
            setLoading(false);
            if (error?.response?.data?.token === false) {
                (window as any).location = "/login"
            }
            if (error?.response?.data?.valid === false) {
                localStorage.removeItem("token");
                (window as any).location = "/login"
            }
            return error;
        }
    }

    return { makeRequest }
}

export default useApi

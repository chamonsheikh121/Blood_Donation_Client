import axios from "axios";
import UseAuthContext from "./UseAuthContext";
import { useNavigate } from 'react-router-dom';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000/'
})

const UseAxiosSecure = () => {
    const { logOut } = UseAuthContext()
    const Navigate = useNavigate()
    axiosSecure.interceptors.request.use(config => {
        const token = JSON.parse(localStorage.getItem('user-token'));
        console.log(token);
        config.headers.authentication = `bearer ${token}`;
        return config
    }, error => {
        console.log(error);
        Promise.reject(error)
    })

    axiosSecure.interceptors.response.use(response => {
        return response
    }, async (error) => {

        if (error?.response.status || error.response.status) {
            await logOut();

            Navigate('/login')

        }


        return Promise.reject(error)
    })

    return axiosSecure
};

export default UseAxiosSecure;
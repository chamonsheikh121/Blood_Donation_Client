import axios from "axios";


const instance = axios.create({
    baseURL: 'https://blood-donation-server-tawny.vercel.app/'
  });

const UseAxiosPublic = () => {
    return instance;
};

export default UseAxiosPublic;
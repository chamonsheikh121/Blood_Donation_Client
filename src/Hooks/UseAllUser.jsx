import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from './UseAxiosSecure';


const UseAllUser = () => {
    const axiosSecure =UseAxiosSecure()
    const {data, isLoading, refetch} = useQuery({
        queryKey:['getAllUsers'],
        queryFn:async()=>{
            const res = await axiosSecure.get('/api/v1/all-users');
            const data = res?.data;
            return data
        }
    })

    return [data, isLoading, refetch]
};

export default UseAllUser;
import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "./UseAxiosPublic";



const UseAllUser = () => {
const axiosPublic = UseAxiosPublic()
    const {data, isLoading, refetch} = useQuery({
        queryKey:['getAllUsers'],
        queryFn:async()=>{
            const res = await axiosPublic.get('/api/v1/all-users');
            const data = res?.data;
            return data
        }
    })

    return [data, isLoading, refetch]
};

export default UseAllUser;
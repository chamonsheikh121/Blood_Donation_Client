import { useQuery } from "@tanstack/react-query";

import UseAuthContext from "./UseAuthContext";
import UseAxiosPublic from "./UseAxiosPublic";



const UseUser = () => {
    const axiosPublic = UseAxiosPublic()
    const {user} = UseAuthContext()
    const {data, refetch, isLoading} = useQuery({
        queryKey:['users', user?.email],
        queryFn:async()=>{
            const res= await axiosPublic.get(`/api/v1/user/${user?.email}`)
            return res.data
        }
    })
    return [data, refetch, isLoading]
};

export default UseUser;
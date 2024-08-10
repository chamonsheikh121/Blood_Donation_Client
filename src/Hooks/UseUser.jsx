import { useQuery } from "@tanstack/react-query";

import UseAuthContext from "./UseAuthContext";
import UseAxiosSecure from "./UseAxiosSecure";


const UseUser = () => {
    const axiosSecure = UseAxiosSecure()
    const {user} = UseAuthContext()
    const {data, refetch, isLoading} = useQuery({
        queryKey:['users', user?.email],
        queryFn:async()=>{
            const res= await axiosSecure.get(`/api/v1/user/${user?.email}`)
            return res.data
        }
    })
    return [data, refetch, isLoading]
};

export default UseUser;
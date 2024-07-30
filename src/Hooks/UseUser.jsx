import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "./UseAxiosPublic";
import UseAuthContext from "./UseAuthContext";


const UseUser = () => {
    const axiosPublic = UseAxiosPublic()
    const {user} = UseAuthContext()
    const {data, refetch} = useQuery({
        queryKey:['users', user?.email],
        queryFn:async()=>{
            const res= await axiosPublic.get(`/api/v1/user/${user?.email}`)
            return res.data
        }
    })
    return [data, refetch]
};

export default UseUser;
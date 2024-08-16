import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "./UseAxiosSecure";

const UseMessage = (email) => {
    console.log(email);
    const axiosSecure = UseAxiosSecure()
    const {data, isLoading, refetch} = useQuery({
        queryKey:['volunteerMessage', email],
        queryFn:async()=>{
            
             const res = await  axiosSecure.get(`/api/v1/message/?email=${email}`);
            const data = res?.data;
            return data
        }
    })
    return [data, isLoading, refetch]
};

export default UseMessage;
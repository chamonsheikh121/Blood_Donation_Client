import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "./UseAxiosPublic";


const UsePost = (email) => {
    const axiosPublic = UseAxiosPublic()
    const {data, isLoading, refetch} = useQuery({
        queryKey:['getPost', email],
        queryFn:async()=>{
            const res = await axiosPublic.get(`/api/v1/get-blogs/?email=${email}`);
            const data = res?.data;
            return data
        }
    })

    return [data, isLoading, refetch]
};

export default UsePost;
import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "./UseAxiosPublic";


const UseAllRequestCount = () => {
    const axiosPublic = UseAxiosPublic()
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['allRequestCount'],
        queryFn: async () => {
            const res = await axiosPublic('/api/v1/all-request-count');
            const data = res.data;
            return data
        }
    })
    return [data,isLoading, refetch]
};

export default UseAllRequestCount;
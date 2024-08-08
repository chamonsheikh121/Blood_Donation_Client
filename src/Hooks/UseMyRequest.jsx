import { useQuery } from "@tanstack/react-query";
import UseAuthContext from "./UseAuthContext";
import UseAxiosPublic from "./UseAxiosPublic";


const UseMyRequest = () => {
    const { user } = UseAuthContext();
    const axiosPublic = UseAxiosPublic();
    const { data,refetch, isLoading } = useQuery({
        queryKey: ['myRequest', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/v1/my-requests/${user?.email}`)
            const data = res?.data;
            return data
        }
    })
    return [data, refetch, isLoading]
};

export default UseMyRequest;
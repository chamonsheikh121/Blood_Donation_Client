import { useQuery } from "@tanstack/react-query";
import UseAuthContext from "./UseAuthContext";
import UseAxiosPublic from "./UseAxiosPublic";


const useAccepterDetails = () => {
    const axiosPublic = UseAxiosPublic();
    const { user } = UseAuthContext()
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['accepterDetails', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/v1/accepter-details/${user?.email}`);
            const data = res?.data;
            return data
        }
    })
    return [data, isLoading, refetch]
};

export default useAccepterDetails;

import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "./UseAxiosPublic";

const UsePeopleComments = (email) => {
    const axiosPublic = UseAxiosPublic();
    const { data, refetch, isLoading } = useQuery({
        queryKey: ['PeoplesComments', email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/v1/peoplesComments?email=${email}`)
            const data = res?.data;
            return data
        }
    })
    return [data, refetch, isLoading]
};

export default UsePeopleComments;
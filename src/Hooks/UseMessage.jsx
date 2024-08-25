import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "./UseAxiosPublic";


const UseMessage = (email) => {
    console.log(email);
    const axiosPublic = UseAxiosPublic()
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['volunteerMessage', email],
        queryFn: async () => {

            const res = await axiosPublic.get(`/api/v1/message?email=${email}`);
            const data = res?.data;
            return data
        }
    })
    return [data, isLoading, refetch]
};

export default UseMessage;
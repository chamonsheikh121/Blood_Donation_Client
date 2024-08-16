import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "./UseAxiosSecure";


const UseVolunteers = () => {
    const axiosSecure = UseAxiosSecure()
  const {data, isLoading, refetch} = useQuery({
    queryKey:['getVolunteers'],
    queryFn:async()=>{
        const res = await axiosSecure.get('/api/v1/all-users');
        const users = res.data;
        const volunteers = users?.filter(data=> data?.userRole == 'volunteer');
        return volunteers
    }
  })
  return [data, isLoading, refetch]
};

export default UseVolunteers;
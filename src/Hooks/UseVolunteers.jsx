import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "./UseAxiosPublic";


const UseVolunteers = () => {
  const axiosPublic = UseAxiosPublic()
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['getVolunteers'],
    queryFn: async () => {
      const res = await axiosPublic.get('/api/v1/all-users');
      const users = res.data;
      const volunteers = users?.filter(data => data?.userRole == 'volunteer');
      return volunteers
    }
  })
  return [data, isLoading, refetch]
};

export default UseVolunteers;
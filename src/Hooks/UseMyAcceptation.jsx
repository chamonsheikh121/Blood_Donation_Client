
import { useQuery } from '@tanstack/react-query';
import UseAxiosPublic from './UseAxiosPublic';
import UseAuthContext from './UseAuthContext';

const UseMyAcceptation = () => {
    const axiosPublic = UseAxiosPublic();
    const {user} = UseAuthContext()
    const {data, isLoading, refetch} = useQuery({
        queryKey:['myAcceptation', user?.email],
        queryFn:async()=>{
            
             const res = await  axiosPublic.get(`/api/v1/my-acceptation/${user?.email}`);
            const data = res?.data;
            return data
        }
    })
    return [data, isLoading, refetch]
};

export default UseMyAcceptation;
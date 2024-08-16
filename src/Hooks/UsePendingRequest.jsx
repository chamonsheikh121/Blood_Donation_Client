
import UseAxiosPublic from './UseAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const UsePendingRequest = () => {
    const axiosPublic = UseAxiosPublic()
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['allPendingRequest'],
        queryFn: async () => {
            const res = await axiosPublic('/api/v1/pending');
            const data = res.data;
            return data
        }
    })
    return [data, isLoading, refetch]
};

export default UsePendingRequest;
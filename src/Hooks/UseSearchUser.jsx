// import { useQuery } from "@tanstack/react-query";
// import UseAxiosPublic from "./UseAxiosPublic";


// const UseSearchUser = ({uid}) => {
//     const axiosPublic = UseAxiosPublic()
//     const {data, refetch, isLoading} = useQuery({
//         queryKey:['searchUsers', uid],
//         queryFn:async()=>{
//             const res= await axiosPublic.get(`/api/v1/user-search/${uid}`)
//             return res?.data
//         }
//     })
//     return [data, refetch, isLoading]
// };

// export default UseSearchUser;
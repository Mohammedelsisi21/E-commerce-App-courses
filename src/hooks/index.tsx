import { useQuery } from "@tanstack/react-query";
import { type IAuthenticatedQuery} from "../interfaces"
import axiosInstance from "@/config";



const useAuthenticatedQuery = ({queryKey, url, config, action} : IAuthenticatedQuery) => {
    return useQuery({
        queryKey: queryKey,
        queryFn: async() => {
            const {data} = await axiosInstance[action](url, config)
            return data
        }
    })
}


export default useAuthenticatedQuery

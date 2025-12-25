import {getLivesRemainsFromLocalStorage} from "../services/LocalStorage.js";
import {useQuery} from "@tanstack/react-query";

export const useLivesRemains = () => {

    return useQuery({
        queryKey: ['lives_remains'],
        queryFn: () => {
            return getLivesRemainsFromLocalStorage()
        },
        gcTime: 0,
        staleTime: 60000
    })
}
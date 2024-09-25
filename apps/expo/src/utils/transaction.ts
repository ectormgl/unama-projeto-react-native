import { useRouter } from "expo-router"

import { api } from "./api"


export function useGetUserPoints() {
    


     
    return api.transaction.getUserPoints.useQuery()
}


//async function getPoints(params: getUserPointsparams) {
//    const {data, status } = api.user.getUserPoints.useQuery()
//    return { data: data ?? null, status }
//}

import { host } from "./URI"
import useSWR from "swr"
export const related =(category)=>{
    const res = useSWR(`${host}/posts?category=${category}`, {refreshInterval: '1m'})
    return res
   
}
import axios from "axios"
import { host } from "./URI"

export const comment = async (params)=>{
let res = await axios.post(`${host}/comments`, params)
let data = await res
    return data
}
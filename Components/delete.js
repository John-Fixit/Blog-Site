import axios from "axios"

export const deleteComment= async(params)=>{
    console.log(params)
       let res = await axios.delete(params)
       let data = await res.data
       console.log(data)
       return data
}
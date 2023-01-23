import axios from "axios";
import { host } from "./URI";

export const likePost = async (params) => {
    console.log(params)
  if (params.likeOption) {
    return "add"
    // const detail = { postId: params["postId"] };
    // let res = await axios.post(`${host}/likes`, detail);
    // let data = await res;
    //    return data
  }
  else{
    return "minus"
    // let res = await axios.delete(`${host}/likes`, detail);
    // let data = await res;
    //    return data
  }
};

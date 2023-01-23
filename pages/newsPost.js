import axios from "axios";
import React, { useState } from "react";
import { host } from "../Components/URI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
function NewsPost() {
    //what do they use createImageBitmap for
    const router = useRouter()
    const [values, setValues] = useState({
        title: "",
        imgUrl: "",
        comments : [],
        likes : [],
        desc: "",
        body: "",
        category: ""
    })

    const toastOption = {
        position: "top-center",
        theme: "colored",
    }

    const handleChange=(e)=>{
            setValues({...values, [e.target.name]: e.target.value})
    }

    const handleSubmit=async(e)=>{
            e.preventDefault();
            axios.post(`${host}/posts`, values).then((res)=>{
                if(res.statusText=="Created"){
                toast.success(`Post successfully ${res.statusText}`, toastOption)
                    router.push('/')
                }
                else{
                    
                    router.push(['/'])

                }
            }).catch((err)=>{
                console.log(err.message)
                toast.error(err.message, toastOption)
            })
    }
  return (
    <>
      <div className="container-fluid">
        <h4 className="text-center">News Form</h4>
        <div className="row">
          <div className="col-lg-9 col-md-12 mx-auto bg-secondary p-3 rounded-3">
            <form className="rounded-4" onSubmit={(e)=>handleSubmit(e)}>
              <div className="my-2 col-lg-6 mx-auto">
                <input
                  className="form-control "
                  placeholder="Title of your News"
                  onChange={(e)=>handleChange(e)}
                  name="title"
                />
              </div>
              <div className="row ">
                <div className="col-lg-6 my-1">
                  <input placeholder="Image Url" className="form-control" onChange={(e)=>handleChange(e)} name="imgUrl"/>
                  
                </div>
                <div className="col-lg-6 my-1">
                  <input
                    placeholder="News Description"
                    className="form-control"
                  onChange={(e)=>handleChange(e)}
                  name="desc"
                  />
                </div>
              </div>
              <div className="my-2">
                <textarea
                  rows={10}
                  style={{ resize: "none" }}
                  className="form-control"
                  placeholder="body of the News"
                  onChange={(e)=>handleChange(e)}
                  name="body"
                ></textarea>
              </div>
              <div className="col-lg-3">
                <select className="form-control my-2" name="category" onChange={(e)=>handleChange(e)}>
                  <option value="category">Category</option>
                  <option value="sport">Sport</option>
                  <option value="education">Education</option>
                  <option value="politics">Politics</option>
                </select>
              </div>
              <div className="float-end">
                <button type="submit" className="btn btn-lg btn-primary">
                  Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default NewsPost;

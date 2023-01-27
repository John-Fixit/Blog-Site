import axios from "axios";
import React, { useRef, useState } from "react";
import { host } from "../Components/URI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { BarLoader } from "react-spinners";
function NewsPost() {
  //what do they use createImageBitmap for
  const router = useRouter();
  const cat_ref = useRef();
  // const category = cat_ref.current.value
  let news_ref = crypto.randomUUID()
  // let news_ref = "";
  let created_at = new Date().toLocaleString();
  const [values, setValues] = useState({
    imgUrl: "",
    desc: "",
    body: "",
    category: "",
    ref: news_ref,
    createdAt: created_at,
  });
  const [loader, setloader] = useState(false);

  const toastOption = {
    position: "top-center",
    theme: "colored",
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloader(true);
    axios
      .post(`${host}/posts`, values)
      .then((res) => {
        if (res.statusText == "Created") {
          toast.success(`Post successfully ${res.statusText}`, toastOption);
          router.push("/newsTable");
        } else {
          router.push(["/"]);
        }
        setloader(false);
      })
      .catch((err) => {
        toast.error(err.message, toastOption);
      })
      .finally(() => {
        setloader(false);
      });
  };
  return (
    <>
      <div className="container-fluid">
        <h4 className="text-center">News Form</h4>
        <div className="row">
          <div className="col-lg-9 col-md-12 mx-auto bg-secondary p-3 rounded-3">
            <BarLoader
              loading={loader}
              color={"navy"}
              speedMultiplier={0.1}
              cssOverride={{ width: "50%", margin: "0 auto" }}
              height={50}
            />
            <form className="rounded-4" onSubmit={(e) => handleSubmit(e)}>
              <div className="row ">
                <div className="col-lg-6 my-1">
                  <input
                    placeholder="Image Url"
                    className="form-control"
                    onChange={(e) => handleChange(e)}
                    name="imgUrl"
                  />
                  <select
                    className="form-control my-2"
                    name="category"
                    onChange={(e) => handleChange(e)}
                  >
                    <option value="category">Category</option>
                    <option value="sport">Sport</option>
                    <option value="education">Education</option>
                    <option value="politics">Politics</option>
                  </select>
                </div>

                               <div className="col-lg-6 my-1">
                  <input
                    placeholder="News Description"
                    className="form-control"
                    onChange={(e) => handleChange(e)}
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
                  onChange={(e) => handleChange(e)}
                  name="body"
                ></textarea>
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

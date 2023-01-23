import React from "react";
import Image from "next/Image";
import axios from "axios";
import { host } from "./URI";
import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = async (...args) => {
  let res = await axios.get(...args);
  let data = await res;
  return data.data;
};
function NewsCard() {
  const num = 5;
  const router = useRouter();

  const { data, error } = useSWR(`${host}/posts`, fetcher);

  const GetPosts = () => {
    console.log(data)
    if (data) {
      return (
        <>
          {data.map((post, id) => {
            return (
              <div className="col-lg-3 col-md-4 my-3" key={id}>
                <div className="card h-100 p-1">
                  <Image
                    src={require("../assets/2.jpg")}
                    className="card-img-top"
                    alt="..."
                    width={250}
                    blurDataURL={true}
                    height={250}
                  />
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">
                      This is a wider card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </p>
                  </div>
                  <div className="card-foote ms-auto">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => goToPost({ id: post.id })}
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      );
    } else {
      return (
        <>
          <i>Oooops! something went wrong!</i>
        </>
      );
    }
  };

  const goToPost = ({ id }) => {
    router.push(`/posts/${id}`);
  };

  return (
    <>
      <div className="row mx-lg-3">
        <GetPosts />
      </div>
    </>
  );
}

export default NewsCard;

import React from "react";
import Image from "next/Image";
import axios from "axios";
import { host } from "./URI";
import { useRouter } from "next/router";
import useSWR from "swr";
import styles from "../styles/newsCard.module.css";
import LatestNews from "./LatestNews";
import Link from "next/link";
import { BarLoader } from "react-spinners";
import TimeAgo from "timeago-react";
import ReactReadMoreReadLess from "react-read-more-read-less";

function NewsCard() {
  const num = 5;
  const router = useRouter();

  const { data, error } = useSWR(`${host}/posts`);

  if (!data || error)
    return (
      <>
        <BarLoader
          height={40}
          cssOverride={{ margin: "4vh auto" }}
          width={300}
          color={"navy"}
        />
      </>
    );

  return (
    <div className="px-lg-5 px-md-2">
      <div className="latest_post shadow-sm p-2 rounded">
        <LatestNews data={data?.reverse().slice(0, 4)} />
      </div>

      <div className="popular_news shadow my-3 p-2 rounded">
        <h1>Popular News</h1>
        <hr />
        <div className="row mx-lg-3">
          {data?.reverse().map((post, id) => {
            return (
              <div className="col-lg-3 col-md-6 my-3" key={id}>
                <div className={`card h-100 p-1 ${styles.eachNews}`}>
                  <Image
                    src={require("../assets/2.jpg")}
                    className="card-img-top rounded-4"
                    alt="..."
                    width={250}
                    blurDataURL={true}
                    height={250}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{post.desc.slice(0, 50)}</h5>
                    <p className="card-text">
                      <ReactReadMoreReadLess
                        charLimit={200}
                        readMoreText={""}
                        readLessText={""}
                      >
                        {post.body}
                      </ReactReadMoreReadLess>
                    </p>
                  </div>
                  <div className="card-foot d-flex justify-content-between">
                    <Link
                      href={`/posts/newsContent?desc=${post.desc}`}
                      className="btn btn-primary"
                    >
                      Read More
                    </Link>
                    <p className="my-auto">
                      <TimeAgo datetime={post.createdAt} />
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default NewsCard;

import React, { useEffect, useRef, useState } from "react";
import Image from "next/Image";
import styles from "../../styles/newsFeed.module.css";
import { comment } from "../../Components/Comment";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { host } from "../../Components/URI";
import { likePost } from "../../Components/like";
import useSWR from "swr";
import ReactReadMoreReadLess from "react-read-more-read-less";
import TimeAgo from "timeago-react";
import Loader from "react-spinners/HashLoader";
import shareStyle from "../../styles/shareBtn.module.css";
import {
  FaFacebook,
  FaRegThumbsUp,
  FaShareAlt,
  FaTrash,
  FaTrashAlt,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { related } from "../../Components/relatedPost";
import ScrollToBottom from "react-scroll-to-bottom";
function NewsContent({ postDetail }) {
  const router = useRouter();
  const scrollRef = useRef();
  const [commentText, setcommentText] = useState("");

  const { data, error, isLoading } = useSWR(
    `${host}/comments?ref=${postDetail[0].ref}`,
    { refreshInterval: 1000 }
  );

  let resNews = related(postDetail?.[0].category);
  let relatedNews = resNews.data?.filter(
    (news) => news.desc != postDetail?.[0].desc
  );
  const sendComment = () => {
    let detail = {
      ref: postDetail[0].ref,
      text: commentText,
      createAt: new Date().toLocaleString(),
    };
    comment(detail)
      .then((res) => {
        if (res.statusText == "Created") {
          setcommentText("");
        } else {
          window.alert(res.data.message);
        }
      })
      .catch((err) => {
        window.alert(err.message);
      });
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [data]);

  return (
    <>
      <div className={`container-fluid ${styles.body}`}>
        <div className="col-lg-11 mx-auto">
          {postDetail ? (
            <section className="row">
              {postDetail.map((post, i) => {
                return (
                  <aside className="col-md-8" key={i}>
                    <div className="">
                      <p className="card-header fs-3 fw-bold">
                        Category : <small>{postDetail[0].category}</small>
                      </p>
                    </div>
                    <div className="p-2">
                      <h3
                        data-toggle="tool-tip"
                        title={"post description"}
                        className=""
                      >
                        {post.desc}
                      </h3>
                      <div className="">
                        <Image
                          src={require("../../assets/2.jpg")}
                          className={`${styles.newsImg}`}
                          alt="loading"
                        />
                      </div>
                      <div
                        className="p-2"
                        style={{ textAlign: "justify", lineHeight: "2rem" }}
                      >
                        <ReactReadMoreReadLess
                          charLimit={200}
                          readMoreText={" (Read more ▼)"}
                          readLessText={` (Hide ▲)`}
                        >
                          {post.body}
                        </ReactReadMoreReadLess>
                      </div>
                      <section
                        className={`rounded-4 d-flex gap-3 float-end ${styles.icon_container}`}
                      >
                        <button className={`btn ${shareStyle.button}`}>
                          <div className={`${shareStyle.icon}`}>
                            <FaShareAlt
                              color="#f2295b"
                              size={"3vh"}
                              className={`gap-2  ${shareStyle.shere}`}
                            />

                            <FaFacebook
                              size={"3vh"}
                              className={`gap-2  ${shareStyle.icon_shere}`}
                            />
                            <FaWhatsapp
                              size={"3vh"}
                              className={`gap-2  ${shareStyle.icon_shere}`}
                            />
                            <FaTwitter
                              size={"3vh"}
                              className={`gap-2  ${shareStyle.icon_shere}`}
                            />
                          </div>
                          <p>Share me</p>
                        </button>
                      </section>
                    </div>
                  </aside>
                );
              })}
              <aside
                className={`col-lg-4 col-md-12 mt-5 ${styles.relatedSection}`}
              >
                <div>
                  <h6>{`${
                    data ? `Comment (${data.length})` : "No Comment"
                  }`}</h6>
                  <div className="rounded-3 bg-secondary">
                    <section className="p-2 comment-section ">
                      <div
                        style={{
                          height: "20rem",
                          width: "100%",
                          overflow: "auto",
                        }}
                      >
                        {data?.map((item, id) => {
                          return (
                            <div
                              className="rounded-3 bg-success border p-2 my-1"
                              key={id}
                              ref={scrollRef}
                            >
                              <section className="text-light">
                                <p className="my-aut">{item.text}</p>
                                <div className="text-end">
                                  <span className="me-auto">
                                    <TimeAgo datetime={item.createAt} />
                                  </span>
                                </div>
                              </section>
                            </div>
                          );
                        })}
                      </div>
                      <div>
                        <input
                          type="text"
                          className="form-control my-2"
                          placeholder="Type your comment here"
                          onChange={(e) => setcommentText(e.target.value)}
                          value={commentText}
                        />
                        <button
                          type="button"
                          className={`rounded-3 btn border-0 col-12 ${
                            !!!commentText && "disabled"
                          }`}
                          onClick={() => sendComment()}
                          style={{ color: "white", backgroundColor: "navy" }}
                        >
                          Comment
                        </button>
                      </div>
                    </section>
                  </div>
                  <div className="mt-3">
                    <h3>Related News</h3>
                    <div>
                      {relatedNews?.map((item, index) => (
                        <div
                          key={index}
                          style={{ cursor: "pointer" }}
                          className={`relatedNews`}
                        >
                          <section
                            className="d-flex border-bottom my-2 p-2"
                            onClick={() =>
                              router.push(
                                `/posts/newsContent?desc=${item.desc}`
                              )
                            }
                          >
                            <Image
                              src={require("../../assets/1.jpg")}
                              width={100}
                              height={100}
                              alt="loading"
                              className="rounded-3"
                            />
                            <span className="px-1">
                              <ReactReadMoreReadLess
                                charLimit={50}
                                readMoreText={""}
                                readLessText={""}
                              >
                                {item.desc}
                              </ReactReadMoreReadLess>
                            </span>
                          </section>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>
            </section>
          ) : (
            <Loader cssOverride={{ margin: "3vh auto" }} />
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default NewsContent;

export const getServerSideProps = async (context) => {
  let res = await axios.get(`${host}/posts?desc=${context.query.desc}`);
  let data = await res.data;

  return {
    props: {
      postDetail: data,
    },
  };
};

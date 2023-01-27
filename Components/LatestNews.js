import Link from 'next/link'
import Image from 'next/Image'
import styles from "../styles/newsCard.module.css"
import Loader from 'react-spinners/ClockLoader'

function LatestNews({data}) {

    if(!data){
        return<>
            <Loader cssOverride={{margin: "3vh auto"}} color={"red"} />
        </>
    }
  return (
    <div className={`${styles.card_container}`}>
        <h1>Latest News</h1>
        <hr />
        <div className='row mx-lg-3'>
            {
                data?.reverse().slice(0, 4).map((post, i)=>{
                    return <div className="col-lg-3 col-md-6 my-3" key={i}>
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
                     {post.body.slice(0, 400)}
                    </p>
                  </div>
                  <div className="card-foot d-flex justify-content-between">
                  <Link
                    href={`/posts/newsContent?desc=${post.desc}`}
                      className="btn btn-primary"
                    
                    >
                      Read More
                    </Link>
                    <p className="my-auto">{post.createdAt}</p>

                  </div>
                </div>
              </div>
                })
            }
        </div>
    </div>
  )
}

export default LatestNews
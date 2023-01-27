import React from 'react'
import { PulseLoader } from 'react-spinners'
import useSWR from "swr"

function newsTable() {

    const {data, error, loading} = useSWR("http://localhost:5000/posts")

    // react-read-more-read-less

    if(!data){
        return<div className='text-center'>
        <PulseLoader color='red' size={30}/>
        </div>
    }
  return (
   <div className='container'>
    <div >
        News <small className='bg-secondary p-3'>{data?.length}</small>

    </div>
        <table className='table table-striped'>
            <thead>
            <tr>
                <th>S/N</th>
                <th>Category</th>
                <th>Image</th>
                <th>Desc</th>
            </tr>
            </thead>
            <tbody>
                {
                    data?.map((item, i)=>{
                        return <tr>
                            <td>{i+1}</td>
                            <td>{item.category}</td>
                            <td>Image</td>
                            <td>{item.desc}</td>
                        </tr>
                    })
                }
            </tbody>
        </table>

   </div>
  )
}

export default newsTable
import { useState } from 'react'
import './List.css'
import axios from 'axios'
import {  url } from '../../assets/assets'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const List = () => {
  const [list , setList] = useState([])

  const fetchList = async()=>{
    const response = await axios.get(`${url}/api/food/list`)
    if(response.data.success){
       setList(response.data.data)
    }else{
      toast.error("could not fetch data")
    }
  }

  const removeFood = async(foodId)=>{
       const response = await axios.post(`${url}/api/food/remove` , {id : foodId})
       if(response.data.success){
          await fetchList()
          toast.success(response.data.message)
       }else{
        toast.error("error")
       }
  }

  useEffect(()=>{
     fetchList()
  },[])

  return (
    <div className='list add flex-col'>
       <p>All Items:</p>
       <div className="list-table">
          <div className="list-table-format title">
               <p>Image</p>
               <p>Name</p>
               <p>Category</p>
               <p>Price</p>
               <p>Action</p>
          </div>
          {list.map((item, index)=>{
            return(
              <div key={index} className="list-table-format">
                <img src={`${url}/image/`+item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{item.price}</p>
                <p className='cursor' onClick={()=>removeFood(item._id)}>x</p>
              </div>
            )
          })}
       </div>
    </div>
  )
}

export default List
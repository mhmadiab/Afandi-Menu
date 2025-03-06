import { useEffect, useState } from 'react'
import { assets , url} from '../../assets/assets'
import './Add.css'
import axios from 'axios'
import { toast } from 'react-toastify'



const Add = () => {
  

  const [image, setImage] = useState(false)
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category : 'Fresh Juice'
  })

  const {name, description, price, category} = data

  const onChangeHandler = (e)=>{
     const name = e.target.name
     const value = e.target.value
     setData((data)=>({...data, [name] : value }))
  }

  const onSubmitHandler = async(e)=>{
     e.preventDefault()
     const formData = new FormData()
     formData.append("name" , data.name)
     formData.append("description" , data.description)
     formData.append("price" , Number(data.price))
     formData.append("category" , data.category)
     formData.append("image" , image) 

     const response = await axios.post(`${url}/api/food/add` , formData)
     if(response.data.success){
        setData({
          name: '',
          description: '',
          price: '',
          category : 'Fresh Juice'
        })
        setImage(false)
        toast.success(response.data.message)
     }else{
         toast.error(response.data.message)
     }


  }

  useEffect(()=>{
     console.log(data)
  },[data])

  return (
    <div className='add'>
      <form onSubmit={onSubmitHandler} className='flex-col'>
          <div className="add-image-upload flex-col">
               <p>Upload Image</p>
               <label htmlFor="image"><img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="upload" /></label>
               <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' required hidden />
          </div>
          <div className="add-product-name flex-col">
            <p>Product name</p>
            <input onChange={onChangeHandler} value={name} name='name' type="text" id="name" placeholder='type here' />
          </div>
          <div className="add-product-description flex-col">
            <p>Product description</p>
            <textarea onChange={onChangeHandler} value={description} name="description" id="description" rows="6"></textarea>
          </div>
          <div className="add-category-price">
            <div className="add-category flex-col">
              <p>Product Category</p>
              <select onChange={onChangeHandler}  name="category">
                <option value="Fresh Juice">Fresh Juice</option>
                <option value="Crepe">Crepe</option>
                <option value="Pancakes">Pancakes</option>
                <option value="Specials">Specials</option>
                <option value="Waffle">Waffle</option>
                <option value="Icecream">Icecream</option>
              </select>
            </div>
            <div className="add-price flex-col">
                 <p>Product Price</p>
                 <input onChange={onChangeHandler} value={price} type="number" name='price' />
            </div>
          </div>
          <button type='submit' className='add-button'>Add</button>
      </form>
    </div>
  )
}

export default Add
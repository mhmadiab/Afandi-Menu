import { createContext, useEffect } from "react";
// import { food_list } from "../../assets/assets/frontend_assets/assets";
import { useState } from "react";
import axios from 'axios'

export const StoreContext = createContext(null)

const StoreContextProvider = (props)=>{

    const [cartItems, setCartItems]= useState({})
    const [food_list , setfoodList] = useState([])

    const url = "http://localhost:4000"

    const addToCart = (itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prevCartItems)=>{
                return {...prevCartItems, [itemId]: 1}
            })
        }else{
            setCartItems((prevCartItems)=>{
                return {...prevCartItems, [itemId]: prevCartItems[itemId]+1}
            })
        }
    }

    const removeFromCart = (itemId)=>{
        setCartItems((prev)=>({...prev, [itemId]: prev[itemId]-1}))

    }

    const getTotalCart = ()=>{
        let total = 0
        for(const item in cartItems){
            if(cartItems[item]){
               total += 1
            }
        }
        return total
    }

    const getTotalCartAmount = ()=>{
        let totalAmount = 0 
        for(const item in cartItems){
            if(cartItems[item]){
               let itemInfo = food_list.find((product)=> product._id === item)
               totalAmount  += itemInfo.price * cartItems[item]
            }
        }
        return totalAmount
    }

    const fetchFoodList = async()=>{
        const response = await axios.get(`${url}/api/food/list`)
        setfoodList(response.data.data)
    }

    useEffect(()=>{
        async function loadData () {
            await fetchFoodList()
        }
        loadData()
    },[])


    const contextValue = {
       food_list,
       cartItems,
       setCartItems,
       removeFromCart,
       addToCart,
       getTotalCartAmount,
       getTotalCart,
       url
       
    }

    

    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider;
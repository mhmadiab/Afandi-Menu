import { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

// eslint-disable-next-line react/prop-types
const FoodDisplay = ({category}) => {

  const { food_list, loading } = useContext(StoreContext);

  return (
      <div className='food-display' id="food-display">
          <h2 dir='rtl' lang='ar'>افضل الأطباق</h2>
          {loading ? (
              <div className="spinner"></div> 
          ) : (
              <div className="food-display-list" dir='rtl' lang='ar'>
                  {food_list.map((item, index) => {
                      if(category === "All" || category === item.category){
                      return <FoodItem key={index} 
                                      id={item._id} 
                                      name={item.name} 
                                      description={item.description} 
                                      price={item.price} 
                                      image={item.image} 
                                      size={item.size}
                                      category={item.category} />
                      }
                  })}
              </div>
          )}
      </div>
  );
};

export default FoodDisplay
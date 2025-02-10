import './ExploreMenu.css'
import { menu_list } from '../../assets/assets/frontend_assets/assets'

// eslint-disable-next-line react/prop-types
const ExploreMenu = ({category , setCategory}) => {


  return (
    <div className='explore-menu' id='explore-menu'>
        <h1 dir='rtl' lang='ar'> استكشف قائمتنا</h1>
        <div className='explore-menu-list'>
            {menu_list.map((item, index)=>{
                console.log(item.menu_name)
                return (
                    <div onClick={()=>setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} 
                        className='explore-menu-list-item' 
                        key={index}>
                      <img src={item.menu_image} alt="" className={category === item.menu_name ? "active" : ""}/>
                      <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr />
    </div>
  )
}

export default ExploreMenu
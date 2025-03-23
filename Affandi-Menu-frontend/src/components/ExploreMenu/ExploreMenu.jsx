import { useRef } from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets/frontend_assets/assets';

// eslint-disable-next-line react/prop-types
const ExploreMenu = ({ category, setCategory }) => {
  const menuRef = useRef(null);

  const scrollLeft = () => {
    if (menuRef.current) {
      menuRef.current.scrollBy({ left: -150, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (menuRef.current) {
      menuRef.current.scrollBy({ left: 150, behavior: 'smooth' });
    }
  };

  return (
    <div className='explore-menu' id='explore-menu'>
      <h1 dir='rtl' lang='ar'>استكشف قائمتنا</h1>
      <div className='explore-menu-container'>
        <button className="scroll-btn left" onClick={scrollLeft}>&lt;</button>
        
        <div className='explore-menu-list' ref={menuRef}>
          {menu_list.map((item, index) => (
            <div 
              onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} 
              className='explore-menu-list-item' 
              key={index}
            >
              <img src={item.menu_image} alt="" className={category === item.menu_name ? "active" : ""}/>
              <p>{item.menu_name}</p>
            </div>
          ))}
        </div>
        
        <button className="scroll-btn right" onClick={scrollRight}>&gt;</button>
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;

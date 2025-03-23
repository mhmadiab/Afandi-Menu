import { useState, useEffect } from 'react';
import './Header.css';

const images = [
  '/header.jpg',
  '/header_image.jpg',
  '/header_image3.jpg',
];

const Header = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="header" style={{ backgroundImage: `url(${images[currentIndex]})` }}>
      <div className="header-contents" dir="rtl" lang="ar">
        <h2>Order here - <span>اطلب هنا</span></h2>
        <p>استمتع بتجربة لا تُنسى من العصائر الطازجة والحلويات اللذيذة، اطلب الآن من مطعمنا واستمتع بأشهى النكهات التي تُحضر بعناية لتصل إليك بأسرع وقت</p>
        <button dir="ltr">View Menu</button> 
      </div>
    </div>
  );
};

export default Header;

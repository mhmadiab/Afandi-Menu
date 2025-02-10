import './Header.css'

const Header = () => {
  return (
    <div className='header'>
        <div className="header-contents" dir="rtl" lang="ar">
            <h2>Order here - <span>اطلب هنا</span></h2>
            <p>استمتع بتجربة لا تُنسى من العصائر الطازجة والحلويات اللذيذة، اطلب الآن من مطعمنا واستمتع بأشهى النكهات التي تُحضر بعناية لتصل إليك بأسرع وقت</p>
            <button dir="ltr">View Menu</button> 
        </div>

    </div>
  )
}

export default Header
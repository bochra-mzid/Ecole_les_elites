import logo from "../assets/img/e5.png"


export default function Navigation (props){
  return (
    <nav id='menu' className='navbar navbar-default navbar-fixed-top'>
      <div className='container'>
        <div className='navbar-header'>
          <button
            type='button'
            className='navbar-toggle collapsed'
            data-toggle='collapse'
            data-target='#bs-example-navbar-collapse-1'
          >
            {' '}
            <span className='sr-only'>Toggle navigation</span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
          </button>
          <img src={logo} alt="logo" width="175" height="60" />
        </div>

        <div
          className='collapse navbar-collapse'
          id='bs-example-navbar-collapse-1'
        >
          <ul className='nav navbar-nav navbar-right'>
            <li>
              <a href='#about' className='page-scroll'>
                مدرستنا
              </a>
            </li>
            <li>
              <a href='#features' className='page-scroll'>
                خدمات
              </a>
            </li>
            <li>
              <a href='#portfolio' className='page-scroll'>
                صور
              </a>
            </li>
            <li>
              <a href='#testimonials' className='page-scroll'>
                أرقامنا
              </a>
            </li>
            <li>
              <a href='#club' className='page-scroll'>
                النوادي
              </a>
            </li>
            <li>
              <a href='#contact' className='page-scroll'>
                اتصال
              </a>
            </li>
            <li>
              <a href='/login' className='page-scroll'>الدخول</a>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  )
}
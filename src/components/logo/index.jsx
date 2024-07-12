import { Link } from 'react-router-dom';

const Logo = ({ className = '', theme = 'dark' }) => {
  return (
    <Link to='/'>
      <img 
        src={`/assets/svgs/${theme === 'dark'? 'logo.svg' : 'logo-white.svg'} `} 
        alt='Logo' 
        className={`${className? className : 'w-[4rem] '} object-contain` }
      />
    </Link>
  )
}

export default Logo;
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  theme?: 'dark' | 'light';
}

const Logo: FC<LogoProps> = ({ className = '', theme = 'dark' }) => {
  return (
    <Link to='/'>
      <img 
        src={`/assets/svgs/${theme === 'dark' ? 'logo.svg' : 'logo-white.svg'}`} 
        alt='Logo' 
        className={`${className ? className : 'w-[4rem]'} object-contain`} 
      />
    </Link>
  );
};

export default Logo;
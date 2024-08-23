import Image from 'next/image';
import Link from 'next/link';

import './Header.css';

interface HeaderInterface {
  isAuthenticated: boolean;
}

const Header = ({ isAuthenticated }: HeaderInterface) => {
  return (
    <header className="header">
      <Link href={'/'}>
        <Image
          className="footer__img"
          src="/static/logo.png"
          alt="RS School Logo"
          width={40}
          height={40}
        />
      </Link>

      <div>"Language Toggle"</div>
      {isAuthenticated ? (
        <button className="header__button">Sign Out</button>
      ) : (
        <>
          <div className="flex">
            <Link className="header__button" href={'/authorization'}>
              Sign In
            </Link>
            <Link className="header__button" href={'/registration'}>
              Sign Up
            </Link>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;

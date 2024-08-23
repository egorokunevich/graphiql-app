import Link from 'next/link';

import './Header.css';

interface HeaderInterface {
  isAuthenticated: boolean;
}

const Header = ({ isAuthenticated }: HeaderInterface) => {
  return (
    <header className="header">
      <Link href={'/'}>
        <img src="path to logo" alt="Logo" />
      </Link>

      <div>there will be a "Language Toggle"</div>
      {isAuthenticated ? (
        <button className="header__button">Sign Out</button>
      ) : (
        <>
          <div className="flex">
            <Link className="header__button" href={'/sighIn'}>
              Sign In
            </Link>
            <Link className="header__button" href={'/sighUp'}>
              Sign Up
            </Link>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;

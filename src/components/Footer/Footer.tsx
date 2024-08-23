import Image from 'next/image';

import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <a href="https://github.com/ tut budet ssylka">GitHub Link</a>
      <span>2024</span>
      <a href="https://rs.school/">
        <Image
          className="footer__img"
          src="/static/logo-rsschool.png"
          alt="RS School Logo"
          width={100}
          height={40}
        />
      </a>
    </footer>
  );
};

export default Footer;

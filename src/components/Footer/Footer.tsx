import { Box } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <Box
        width={'100%'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Link href="https://github.com/egorokunevich/graphiql-app">
          GitHub Repo
        </Link>
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
      </Box>
    </footer>
  );
};

export default Footer;

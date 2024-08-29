import { Box } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

import './Footer.css';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        height: '60px',
        padding: '40px 10px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'cornsilk',
        border: '1px solid #000',
      }}
    >
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
            style={{ maxWidth: '100px' }}
            src="/static/logo-rsschool.png"
            alt="RS School Logo"
            width={100}
            height={40}
          />
        </a>
      </Box>
    </Box>
  );
};

export default Footer;

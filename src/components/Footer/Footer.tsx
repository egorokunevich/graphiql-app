import { Box } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

import './Footer.css';

import type { Dictionary } from '@/src/utils/getDictionary';

interface FooterProps {
  t: Dictionary['basic'];
}

const Footer = ({ t }: FooterProps) => {
  return (
    <Box
      component="footer"
      sx={{
        height: '60px',
        padding: '40px 10px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTop: '1px solid rgba(0, 0, 0, 0.12)',
      }}
    >
      <Box
        width={'100%'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Link href="https://github.com/egorokunevich/graphiql-app">
          GitHub {t.repo}
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

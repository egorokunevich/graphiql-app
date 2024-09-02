import { Box } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

import type { Dictionary } from '@/src/utils/getDictionary';

interface FooterProps {
  t: Dictionary['basic'];
}

const Footer = ({ t }: FooterProps) => {
  return (
    <Box
      className="bg-gradient-to-b from-slate-100 to-teal-100"
      component="footer"
      sx={{ p: 2, px: 4, textAlign: 'center' }}
    >
      <Box
        width={'100%'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        fontSize={22}
        lineHeight={1}
        fontWeight="fontWeightMedium"
      >
        <Link
          href="https://github.com/egorokunevich/graphiql-app"
          className="hover:text-sky-700 transition duration-300 ease-in-out"
        >
          GitHub {t.repo}
        </Link>
        <Box component="span" m={1}>
          2024
        </Box>
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
    </Box>
  );
};

export default Footer;

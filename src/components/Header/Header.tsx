'use client';

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import './Header.css';

interface HeaderInterface {
  isAuthenticated: boolean;
}

const Header = ({ isAuthenticated }: HeaderInterface) => {
  const [language, setLanguage] = useState('en');

  const handleLanguageChange = () => {
    if (language === 'en') {
      setLanguage('ru');
    } else {
      setLanguage('en');
    }
  };

  return (
    <header>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 2rem',
          width: '100%',
          backgroundColor: '#F0F7F4',
        }}
      >
        <Link href={'/'}>
          <Image
            src="/static/logo.png"
            alt="RS School Logo"
            width={40}
            height={40}
          />
        </Link>
        <FormControl fullWidth sx={{ maxWidth: '200px' }}>
          <InputLabel id="language-toggle-label">Language</InputLabel>
          <Select
            variant="standard"
            labelId="language-toggle-label"
            id="language-toggle"
            value={language}
            label="Language"
            onChange={handleLanguageChange}
          >
            <MenuItem value="en">EN</MenuItem>
            <MenuItem value="ru">RU</MenuItem>
          </Select>
        </FormControl>
        {isAuthenticated ? (
          <Button variant="outlined">Sign Out</Button>
        ) : (
          <Box
            sx={{
              display: 'flex',
              gap: '1rem',
            }}
          >
            <Button variant="outlined" href="/authorization">
              Sign In
            </Button>
            <Button variant="outlined" href="/registration">
              Sign Up
            </Button>
          </Box>
        )}
      </Box>
    </header>
  );
};

export default Header;

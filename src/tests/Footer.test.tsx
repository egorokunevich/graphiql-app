import { render, screen } from '@testing-library/react';
import { useTranslations } from 'next-intl';
import React from 'react';

const Footer = React.lazy(() => import('../components/Footer/Footer'));

jest.mock('next-intl', () => ({
  useTranslations: jest.fn(),
}));

describe('Footer', () => {
  beforeEach(() => {
    (useTranslations as jest.Mock).mockReturnValue((key: string) => key);
  });

  test('renders footer component', () => {
    render(<Footer />);
    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).not.toBeNull();
  });

  test('renders GitHub link with correct href', () => {
    render(<Footer />);
    const githubLink = screen.getByRole('link', { name: /GitHub repo/i });
    expect(githubLink).not.toBeNull();
    expect(githubLink.getAttribute('href')).toBe(
      'https://github.com/egorokunevich/graphiql-app',
    );
  });

  test('renders year 2024', () => {
    render(<Footer />);
    const yearElement = screen.getByText('2024');
    expect(yearElement).not.toBeNull();
  });

  test('renders RS School logo with correct src and alt', () => {
    render(<Footer />);
    const logoImage = screen.getByAltText('RS School Logo');
    expect(logoImage).not.toBeNull();
    // expect(logoImage.getAttribute('src')).toBe('/static/logo-rsschool.png');
    expect(logoImage.getAttribute('width')).toBe('100');
    expect(logoImage.getAttribute('height')).toBe('40');
  });

  test('renders RS School link with correct href', () => {
    render(<Footer />);
    const rsSchoolLink = screen.getByRole('link', { name: /RS School Logo/i });
    expect(rsSchoolLink).not.toBeNull();
    expect(rsSchoolLink.getAttribute('href')).toBe('https://rs.school/');
  });
});


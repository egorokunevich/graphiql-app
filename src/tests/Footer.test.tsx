import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import React from 'react';

import Footer from '@src/components/Footer/Footer';
import { render } from '@src/tests/test-utils';

describe('Footer', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  test('renders footer component', async () => {
    const footerElement = await screen.findByTestId('footer');
    expect(footerElement).not.toBeNull();
  });

  test('renders GitHub link with correct href', () => {
    const githubLink = screen.getByRole('link', { name: /GitHub repo/i });

    expect(githubLink).not.toBeNull();
    expect(githubLink.getAttribute('href')).toBe(
      'https://github.com/egorokunevich/graphiql-app',
    );
  });

  test('renders year 2024', () => {
    const yearElement = screen.getByText('2024');

    expect(yearElement).not.toBeNull();
  });

  test('renders RS School logo with correct src and alt', () => {
    const logoImage = screen.getByAltText('RS School Logo');

    expect(logoImage).not.toBeNull();
    expect(logoImage.getAttribute('width')).toBe('100');
    expect(logoImage.getAttribute('height')).toBe('40');
  });

  test('renders RS School link with correct href', () => {
    const rsSchoolLink = screen.getByRole('link', { name: /RS School Logo/i });

    expect(rsSchoolLink).not.toBeNull();
    expect(rsSchoolLink.getAttribute('href')).toBe('https://rs.school/');
  });
});

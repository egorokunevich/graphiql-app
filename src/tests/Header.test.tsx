import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

const Header = React.lazy(() => import('../components/Header/Header'));

import { useLayoutContext } from '@/src/context/LayoutContext';
import { useAuthEffect } from '@/src/hooks/useAuthEffect';

jest.mock('@/src/context/LayoutContext', () => ({
  useLayoutContext: jest.fn(),
}));
jest.mock('@/src/hooks/useAuthEffect');
jest.mock('next/navigation', () => ({
  useParams: jest.fn().mockReturnValue({ lang: 'en' }),
}));

describe('Header', () => {
  const setMainPage = jest.fn();
  const setAuthUser = jest.fn();

  beforeEach(() => {
    (useLayoutContext as jest.Mock).mockReturnValue({
      mainPage: false,
      setMainPage,
    });
    (useAuthEffect as jest.Mock).mockImplementation((callback) => {
      callback(null);
    });
  });

  test('renders header component', () => {
    render(<Header />);
    const headerElement = screen.getByTestId('header');
    expect(headerElement).not.toBeNull();
  });

  test('renders logo with correct link', () => {
    render(<Header />);
    const logoLink = screen.getByRole('link', { name: /RS School Logo/i });
    expect(logoLink.getAttribute('href')).toBe('/en');
  });

  test('renders sign in and sign up buttons when not authenticated', () => {
    render(<Header />);
    const signInButton = screen.getByText(/Sign In/i);
    const signUpButton = screen.getByText(/Sign Up/i);
    expect(signInButton).not.toBeNull();
    expect(signUpButton).not.toBeNull();
  });

  test('renders sign out button when authenticated and on main page', () => {
    (useLayoutContext as jest.Mock).mockReturnValue({
      mainPage: true,
      setMainPage,
    });
    (useAuthEffect as jest.Mock).mockImplementation((callback) => {
      callback({ uid: '123' });
    });
    render(<Header />);
    const signOutButton = screen.getByText(/Sign Out/i);
    expect(signOutButton).not.toBeNull();
  });

  test('renders main page button when authenticated and not on main page', () => {
    (useAuthEffect as jest.Mock).mockImplementation((callback) => {
      callback({ uid: '123' });
    });
    render(<Header />);
    const mainPageButton = screen.getByText(/Main Page/i);
    expect(mainPageButton).not.toBeNull();
  });

  test('handles main page button click', () => {
    (useAuthEffect as jest.Mock).mockImplementation((callback) => {
      callback({ uid: '123' });
    });
    render(<Header />);
    const mainPageButton = screen.getByText(/Main Page/i);
    fireEvent.click(mainPageButton);
    expect(setMainPage).toHaveBeenCalledWith(true);
  });

  test('toggles sticky class on scroll', () => {
    render(<Header />);
    const headerElement = screen.getByTestId('header');
    expect(headerElement.classList.contains('sticky')).toBe(false);
    fireEvent.scroll(window, { target: { scrollY: 100 } });
    expect(headerElement.classList.contains('sticky')).toBe(true);
  });
});


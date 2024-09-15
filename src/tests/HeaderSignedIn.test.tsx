import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  mockGetAuthWithNull,
  mockSignOut,
  mockOnAuthStateChangedSignedIn,
  mockCreateUserWithEmailAndPassword,
  mockSignInWithEmailAndPassword,
} from './mocks/mockFirebase';

import { mockPush } from '@/setupJest';
import Header from '@src/components/Header/Header';
import { render } from '@src/tests/test-utils';

jest.mock('firebase/app', () => {
  return {
    initializeApp: jest.fn(),
  };
});

jest.mock('firebase/auth', () => {
  return {
    getAuth: mockGetAuthWithNull,
    signOut: mockSignOut,
    onAuthStateChanged: mockOnAuthStateChangedSignedIn,
    createUserWithEmailAndPassword: mockCreateUserWithEmailAndPassword,
    signInWithEmailAndPassword: mockSignInWithEmailAndPassword,
  };
});

describe('Header signed in', () => {
  test('renders header component', async () => {
    render(<Header />);

    const header = await screen.findByTestId('header');
    expect(header).toBeInTheDocument();
  });

  test('renders logo with correct link', async () => {
    render(<Header />);

    const logoLink = await screen.findByRole('link', {
      name: /RS School Logo/i,
    });
    expect(logoLink.getAttribute('href')).toBe('/en');
  });

  test('renders sign out button when authenticated and on main page', async () => {
    render(<Header />);

    const signOutButton = await screen.findByText(/Sign Out/i);
    expect(signOutButton).toBeInTheDocument();
  });

  test('renders main page button when authenticated and not on main page', async () => {
    render(<Header />);

    const mainPageButton = await screen.findByText(/Main Page/i);
    expect(mainPageButton).toBeInTheDocument();
  });

  test('handles main page button click', async () => {
    const user = userEvent.setup();

    render(<Header />);

    const mainPageButton = await screen.findByText(/Main Page/i);
    await user.click(mainPageButton);

    expect(mockPush).toHaveBeenCalledWith('/en');
  });
});

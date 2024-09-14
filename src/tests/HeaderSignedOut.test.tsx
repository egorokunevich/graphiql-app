import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';

import {
  mockGetAuthWithNull,
  mockSignOut,
  mockCreateUserWithEmailAndPassword,
  mockSignInWithEmailAndPassword,
  mockOnAuthStateChangedSignedOut,
} from './mocks/mockFirebase';

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
    onAuthStateChanged: mockOnAuthStateChangedSignedOut,
    createUserWithEmailAndPassword: mockCreateUserWithEmailAndPassword,
    signInWithEmailAndPassword: mockSignInWithEmailAndPassword,
  };
});

describe('Header signed out', () => {
  test('renders sign in and sign up buttons when not authenticated', async () => {
    render(<Header />);
    const signInButton = await screen.findByText(/Sign In/i);
    const signUpButton = await screen.findByText(/Sign Up/i);

    expect(signInButton).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();
  });
});

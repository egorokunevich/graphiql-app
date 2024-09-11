import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';

import {
  mockSignOut,
  mockSignInWithEmailAndPassword,
  mockOnAuthStateChangedSignedOut,
  mockGetAuthWithNull,
  mockCreateUserWithEmailAndPassword,
} from './mocks/mockFirebase';

import { render } from '@/src/tests/test-utils';
import MainPage from '@app/[lang]/page';

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

describe('MainPage', () => {
  it('Should render in the document', async () => {
    render(<MainPage />);

    const mainPage = await screen.findByTestId('main-page');
    expect(mainPage).toBeInTheDocument();
  });
});

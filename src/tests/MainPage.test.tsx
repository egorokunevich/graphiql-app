import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';

import {
  mockSignOut,
  mockSignInWithEmailAndPassword,
  mockCreateUserWithEmailAndPassword,
  mockGetAuthWithAuth,
  mockOnAuthStateChangedSignedIn,
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
    getAuth: mockGetAuthWithAuth,
    signOut: mockSignOut,
    onAuthStateChanged: mockOnAuthStateChangedSignedIn,
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

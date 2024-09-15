import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

// eslint-disable-next-line no-restricted-imports
import {
  mockCreateUserWithEmailAndPassword,
  mockGetAuthWithAuth,
  mockOnAuthStateChangedSignedIn,
  mockSignInWithEmailAndPassword,
  mockSignOut,
} from '../mocks/mockFirebase';

import RestClient from '@app/[lang]/client/rest-client/page';
import { render } from '@src/tests/test-utils';

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

screen.debug();

describe('REST Client', () => {
  it('Should render in the document', async () => {
    render(<RestClient />);

    const client = await screen.findByTestId('rest-client');
    expect(client).toBeInTheDocument();
  });
});

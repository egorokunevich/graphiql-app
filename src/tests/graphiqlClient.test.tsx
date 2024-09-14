import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  mockCreateUserWithEmailAndPassword,
  mockGetAuthWithNull,
  mockOnAuthStateChangedSignedIn,
  mockSignInWithEmailAndPassword,
  mockSignOut,
} from './mocks/mockFirebase';

import GraphiQLClient from '@app/[lang]/client/graphiql-client/page';
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

describe('GraphiQLClient', () => {
  it('Should render in the document', async () => {
    const user = userEvent.setup();

    render(<GraphiQLClient />);

    const client = await screen.findByTestId('graphiql-client');
    expect(client).toBeInTheDocument();

    const urlInput = await screen.findByTestId('graphiql-url');
    expect(urlInput).toBeInTheDocument();

    const sendBtn = await screen.findByTestId('graphiql-send');
    expect(sendBtn).toBeInTheDocument();

    await user.type(urlInput, 'https://mock-endpont.com');

    expect(urlInput).toHaveValue('https://mock-endpont.com');

    await user.click(sendBtn);
  });
});

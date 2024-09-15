import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// eslint-disable-next-line no-restricted-imports
import {
  mockSignOut,
  mockSignInWithEmailAndPassword,
  mockCreateUserWithEmailAndPassword,
  mockGetAuthWithAuth,
  mockOnAuthStateChangedSignedIn,
} from '../mocks/mockFirebase';

import { mockPush } from '@/setupJest';
import { render } from '@/src/tests/test-utils';
import HistoryPage from '@app/[lang]/client/history/page';

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

describe('HistoryPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should render in the document', async () => {
    render(<HistoryPage />);

    const historyPage = await screen.findByTestId('history-page');
    expect(historyPage).toBeInTheDocument();
  });

  it('Should call a router on rest button click', async () => {
    const user = userEvent.setup();

    render(<HistoryPage />);

    const restBtn = await screen.findByTestId('history-restBtn');

    await user.click(restBtn);

    expect(mockPush).toHaveBeenCalledWith('/en/client/rest-client');
  });

  it('Should call a router on graphiql button click', async () => {
    const user = userEvent.setup();

    render(<HistoryPage />);

    const graphiqlBtn = await screen.findByTestId('history-graphiqlBtn');

    await user.click(graphiqlBtn);

    expect(mockPush).toHaveBeenCalledWith('/en/client/graphiql-client');
  });
});

import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// eslint-disable-next-line no-restricted-imports
import {
  mockCreateUserWithEmailAndPassword,
  mockGetAuthWithAuth,
  mockOnAuthStateChangedSignedIn,
  mockSignInWithEmailAndPassword,
  mockSignOut,
} from '../mocks/mockFirebase';
// eslint-disable-next-line no-restricted-imports
import { mockHistoryRecord } from '../mocks/mockResponse';

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

jest.mock('@src/context/HistoryContext', () => ({
  ...jest.requireActual('@src/context/HistoryContext'),
  useHistoryContext: jest.fn().mockReturnValue({
    history: [mockHistoryRecord],
    addHistoryEntry: jest.fn(),
    clearHistory: jest.fn(),
    selectedRequest: mockHistoryRecord,
    setSelectedRequest: jest.fn(),
  }),
}));

describe('REST Client', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should render in the document', async () => {
    const user = userEvent.setup();

    render(<RestClient />);

    const client = await screen.findByTestId('rest-client');
    expect(client).toBeInTheDocument();

    const sendBtn = await screen.findByTestId('rest-sendBtn');

    await user.click(sendBtn);
  });
});

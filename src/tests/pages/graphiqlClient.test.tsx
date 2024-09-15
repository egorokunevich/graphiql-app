import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// eslint-disable-next-line no-restricted-imports
import {
  mockCreateUserWithEmailAndPassword,
  mockGetAuthWithNull,
  mockOnAuthStateChangedSignedIn,
  mockSignInWithEmailAndPassword,
  mockSignOut,
} from '../mocks/mockFirebase';
// eslint-disable-next-line no-restricted-imports
import { mockHistoryRecord } from '../mocks/mockResponse';

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

jest.mock('@src/context/HistoryContext', () => ({
  ...jest.requireActual('@src/context/HistoryContext'),
  useHistoryContext: jest.fn().mockReturnValue({
    history: [{ mockHistoryRecord, type: 'graphiql-client' }],
    addHistoryEntry: jest.fn(),
    clearHistory: jest.fn(),
    selectedRequest: { mockHistoryRecord, type: 'graphiql-client' },
    setSelectedRequest: jest.fn(),
  }),
}));

describe('GraphiQLClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should render in the document', async () => {
    const user = userEvent.setup();

    render(<GraphiQLClient />);

    const client = await screen.findByTestId('graphiql-client');
    expect(client).toBeInTheDocument();

    const urlInput = await screen.findByTestId('graphiql-url');
    expect(urlInput).toBeInTheDocument();

    const sendBtn = await screen.findByTestId('graphiql-send');
    expect(sendBtn).toBeInTheDocument();

    await user.type(urlInput, 'mock-endpoint.com');

    expect(urlInput).toHaveValue('mock-endpoint.com');

    await user.click(sendBtn);
  });
});

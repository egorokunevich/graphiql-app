import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// We use relative path because hoisted jest.mock() can't find modules imported via path aliases.
// eslint-disable-next-line no-restricted-imports
import {
  mockSignOut,
  mockSignInWithEmailAndPassword,
  mockCreateUserWithEmailAndPassword,
  mockGetAuthWithAuth,
  mockOnAuthStateChangedSignedIn,
} from '../mocks/mockFirebase';
// eslint-disable-next-line no-restricted-imports
import { mockHistoryRecord } from '../mocks/mockResponse';

import { mockPush } from '@/setupJest';
import HistoryPage from '@app/[lang]/client/history/page';
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

describe('HistoryPage', () => {
  it('Should render a list of requests', async () => {
    const user = userEvent.setup();

    render(<HistoryPage />);

    const historyPage = await screen.findByTestId('history-page');
    expect(historyPage).toBeInTheDocument();

    const requestList = await screen.findByTestId('history-requestList');

    expect(requestList).toBeInTheDocument();

    const savedRequests = await screen.findAllByTestId('history-savedRequest');

    await user.click(savedRequests[0]);

    expect(mockPush).toHaveBeenCalledWith(
      `/en/client/${mockHistoryRecord.type}`,
    );
  });
});

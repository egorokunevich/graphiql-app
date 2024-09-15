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

import SignUp from '@app/[lang]/registration/page';
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

describe('SignUp page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should render in the document', async () => {
    const user = userEvent.setup();

    render(<SignUp />);

    const page = await screen.findByTestId('signUp-page');
    expect(page).toBeInTheDocument();

    const submitBtn = await screen.findByTestId('signUp-submitBtn');
    const emailInput = await screen.findByPlaceholderText('Enter your email');
    const passwordInput = await screen.findByPlaceholderText(
      'Enter your password',
    );

    expect(submitBtn).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    await user.type(emailInput, 'email@email.com');
    await user.type(passwordInput, 'qweRTY123!');

    expect(emailInput).toHaveValue('email@email.com');

    await user.click(submitBtn);
  });
});

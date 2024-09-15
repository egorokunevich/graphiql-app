import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  mockGetAuthWithNull,
  mockSignOut,
  mockOnAuthStateChangedSignedIn,
  mockCreateUserWithEmailAndPassword,
  mockSignInWithEmailAndPassword,
} from './mocks/mockFirebase';

import { mockPush } from '@/setupJest';
import ButtonMainPage from '@src/components/Buttons/ButtonMainPage';
import ButtonSignIn from '@src/components/Buttons/ButtonSignIn';
import ButtonSignOut from '@src/components/Buttons/ButtonSignOut';
import ButtonSignUp from '@src/components/Buttons/ButtonSignUp';
import { render } from '@src/tests/test-utils';

describe('ButtonMainPage', () => {
  it('renders the button with correct text', async () => {
    render(<ButtonMainPage onClick={() => {}} />);
    expect(await screen.findByText('Main Page')).toBeInTheDocument();
  });

  it('calls onClick when the button is clicked', async () => {
    const handleClick = jest.fn();
    render(<ButtonMainPage onClick={handleClick} />);
    fireEvent.click(await screen.findByText('Main Page'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

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

describe('ButtonSignIn', () => {
  it('renders the button with correct text', async () => {
    render(<ButtonSignIn />);
    expect(await screen.findByText('Sign In')).toBeInTheDocument();
  });

  it('calls router.push with correct URL when the button is clicked', async () => {
    render(<ButtonSignIn />);

    fireEvent.click(await screen.findByTestId('btn-signIn'));

    expect(mockPush).toHaveBeenCalledWith('/en/authorization');
  });
});

describe('ButtonSignUp', () => {
  it('renders the button with correct text', async () => {
    render(<ButtonSignUp />);

    expect(await screen.findByText('Sign Up')).toBeInTheDocument();
  });

  it('calls router.push with correct URL when the button is clicked', async () => {
    const user = userEvent.setup();

    render(<ButtonSignUp />);

    const btnSignUp = await screen.findByTestId('btn-signUp');

    await user.click(btnSignUp);

    expect(mockPush).toHaveBeenCalledWith('/en/registration');
  });
});

describe('ButtonSignOut', () => {
  it('renders the button with correct text', async () => {
    render(<ButtonSignOut />);

    const signOutBtn = await screen.findByText('Sign Out');

    expect(signOutBtn).toBeInTheDocument();
  });

});

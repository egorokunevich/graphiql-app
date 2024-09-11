import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { NextIntlClientProvider } from 'next-intl';

import {
  mockSignInWithEmailAndPassword,
  mockSignOut,
  mockUserCredential,
} from './mocks/mockFirebase';

import SignIn from '@/app/[lang]/authorization/page';
import LangLayout from '@src/components/LangLayout/LangLayout';
// import { LayoutProvider } from '@src/context/LayoutContext';
import { render } from '@src/tests/test-utils';

jest.mock('firebase/app', () => {
  return {
    initializeApp: jest.fn(),
  };
});

jest.mock('firebase/auth', () => {
  return {
    getAuth: jest.fn().mockResolvedValue(null), // or .mockResolvedValue(mockAuth)
    signOut: mockSignOut,
    onAuthStateChanged: jest.fn((auth, callback) => {
      callback({ uid: 'mock-uid', email: 'mock@example.com' });
      return jest.fn();
    }),
    createUserWithEmailAndPassword: jest
      .fn()
      .mockResolvedValue(mockUserCredential),
    signInWithEmailAndPassword: mockSignInWithEmailAndPassword,
  };
});

describe('SignIn', () => {
  it('Should render in the document', async () => {
    render(<SignIn />);

    const loginPage = await screen.findByTestId('login-page');
    expect(loginPage).toBeInTheDocument();
  });

  it('Should call a singIn function', async () => {
    const user = userEvent.setup();

    render(<SignIn />);

    const loginPage = await screen.findByTestId('login-page');
    expect(loginPage).toBeInTheDocument();

    const loginBtn = await screen.findByTestId('btn-login');
    const emailInput = await screen.findByPlaceholderText('Enter your email');
    const passwordInput = await screen.findByPlaceholderText(
      'Enter your password',
    );

    expect(loginBtn).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    await user.type(emailInput, 'email@email.com');
    await user.type(passwordInput, 'qweRTY123!');
    await user.click(loginBtn);

    expect(mockSignInWithEmailAndPassword).toHaveBeenCalled();
  });

  it('Should render signOutBtn and call signOut function', async () => {
    const user = userEvent.setup();

    const child = <div>Mock Element</div>;
    const langLayout = await LangLayout({
      children: child,
    });

    render(langLayout);

    const signOutBtn = await screen.findByTestId('btn-signOut');

    expect(signOutBtn).toBeInTheDocument();

    await user.click(signOutBtn);

    expect(mockSignOut).toHaveBeenCalled();
  });
});

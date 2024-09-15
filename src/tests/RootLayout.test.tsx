import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  mockSignOut,
  mockSignInWithEmailAndPassword,
  mockOnAuthStateChangedSignedOut,
  mockGetAuthWithNull,
  mockCreateUserWithEmailAndPassword,
} from './mocks/mockFirebase';

import { mockPush } from '@/setupJest';
import ApiLayout from '@app/api/layout';
import LangLayout from '@src/components/LangLayout/LangLayout';
import { render } from '@src/tests/test-utils';

jest.clearAllMocks();

jest.mock('firebase/app', () => {
  return {
    initializeApp: jest.fn(),
  };
});

jest.mock('firebase/auth', () => {
  return {
    getAuth: mockGetAuthWithNull,
    signOut: mockSignOut,
    onAuthStateChanged: mockOnAuthStateChangedSignedOut,
    createUserWithEmailAndPassword: mockCreateUserWithEmailAndPassword,
    signInWithEmailAndPassword: mockSignInWithEmailAndPassword,
  };
});

describe('RootLayout', () => {
  it('Should render in the document', async () => {
    const child = <div></div>;

    const langLayout = await LangLayout({
      children: child,
    });

    render(langLayout);

    const layout = await screen.findByTestId('lang-layout');
    expect(layout).toBeInTheDocument();
  });

  it('Should call a navigation function', async () => {
    const user = userEvent.setup();

    const child = <div>Mock Element</div>;
    const langLayout = await LangLayout({
      children: child,
    });

    render(langLayout);

    const layout = await screen.findByTestId('lang-layout');
    expect(layout).toBeInTheDocument();

    const signInBtn = await screen.findByTestId('btn-signIn');
    expect(signInBtn).toBeInTheDocument();

    await user.click(signInBtn);

    expect(mockPush).toHaveBeenCalledWith('/en/authorization');
  });
});

describe('ApiLayout', () => {
  it('Should render in the document', async () => {
    const child = <div></div>;

    const apiLayout = await ApiLayout({
      children: child,
    });

    render(apiLayout);

    const layout = await screen.findByTestId('api-layout');
    expect(layout).toBeInTheDocument();
  });
});

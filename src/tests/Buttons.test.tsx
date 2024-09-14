import { render, fireEvent } from '@testing-library/react';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React from 'react';

import { auth } from '@/src/utils/firebase';

const ButtonSignIn = React.lazy(
  () => import('../components/Buttons/ButtonSignIn'),
);
const ButtonSignUp = React.lazy(
  () => import('../components/Buttons/ButtonSignUp'),
);
const ButtonSignOut = React.lazy(
  () => import('../components/Buttons/ButtonSignOut'),
);
const ButtonMainPage = React.lazy(
  () => import('../components/Buttons/ButtonMainPage'),
);

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) =>
    key === 'basic.mainPage' ? 'Main Page' : key,
}));

describe('ButtonMainPage', () => {
  it('renders the button with correct text', () => {
    const { getByText } = render(<ButtonMainPage onClick={() => {}} />);
    expect(getByText('Main Page')).toBeInTheDocument();
  });

  it('calls onClick when the button is clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<ButtonMainPage onClick={handleClick} />);
    fireEvent.click(getByText('Main Page'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) =>
    key === 'basic.signIn' ? 'Sign In' : key,
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
  useParams: jest.fn(() => ({ lang: 'en' })),
}));

describe('ButtonSignIn', () => {
  it('renders the button with correct text', () => {
    const { getByText } = render(<ButtonSignIn />);
    expect(getByText('Sign In')).toBeInTheDocument();
  });

  it('calls router.push with correct URL when the button is clicked', () => {
    const { push } = useRouter();
    const { getByTestId } = render(<ButtonSignIn />);
    fireEvent.click(getByTestId('btn-signIn'));

    expect(push).toHaveBeenCalledWith('/en/authorization');
  });
});

describe('ButtonSignUp', () => {
  it('renders the button with correct text', () => {
    const { getByText } = render(<ButtonSignUp />);
    expect(getByText('Sign Up')).toBeInTheDocument();
  });

  it('calls router.push with correct URL when the button is clicked', () => {
    const { push } = useRouter();
    const { getByTestId } = render(<ButtonSignUp />);
    fireEvent.click(getByTestId('btn-signUp'));

    expect(push).toHaveBeenCalledWith('/en/authorization');
  });
});

describe('ButtonSignOut', () => {
  it('renders the button with correct text', () => {
    const { getByText } = render(<ButtonSignOut />);
    expect(getByText('Sign Out')).toBeInTheDocument();
  });

  // it('calls signOut when the button is clicked', () => {
  //   const { getByTestId } = render(<ButtonSignOut />);
  //   fireEvent.click(getByTestId('btn-signOut'));
  //   expect(signOut).toHaveBeenCalledWith(auth);
  // });
});


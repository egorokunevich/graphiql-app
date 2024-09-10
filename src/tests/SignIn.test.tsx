import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SignIn from '@/app/[lang]/authorization/page';
import { render } from '@src/tests/test-utils';

describe('SignIn', () => {
  it('Should render in the document', async () => {
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
  });
});

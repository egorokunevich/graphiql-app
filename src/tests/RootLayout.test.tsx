import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mockPush } from '@/setupJest';
import LangLayout from '@src/components/LangLayout/LangLayout';
import { render } from '@src/tests/test-utils';

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

    const signInBtn = await screen.findByTestId('btn-signIn');
    expect(signInBtn).toBeInTheDocument();

    await user.click(signInBtn);

    expect(mockPush).toHaveBeenCalledWith('/en/authorization');
  });
});

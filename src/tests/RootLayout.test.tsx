import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';

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
});

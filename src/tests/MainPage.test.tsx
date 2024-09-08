import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';

import { render } from '@/src/tests/test-utils';
import MainPage from '@app/[lang]/page';

// jest.mock('next/navigation', () => ({
//   useParams: jest.fn().mockReturnValue({
//     lang: 'en',
//   }),
// }));

describe('MainPage', () => {
  it('Should render in the document', async () => {
    const page = await MainPage();

    render(page);

    const mainPage = await screen.findByTestId('main-page');
    expect(mainPage).toBeInTheDocument();
  });
});

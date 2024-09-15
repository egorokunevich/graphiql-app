import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';

import HeadersEditor from '@/src/components/GraphiQLClient/HeadersEditor';
import { render } from '@src/tests/test-utils';

const mockSetHeaders = jest.fn();
const mockSetUpdateUrl = jest.fn();

describe('HeadersEditor', () => {
  const initialHeaders = [
    { key: 'Authorization', value: 'Bearer token' },
    { key: 'Content-Type', value: 'application/json' },
  ];

  const setup = () => {
    render(
      <HeadersEditor
        headers={initialHeaders}
        setHeaders={mockSetHeaders}
        updateUrl="http://localhost"
        setUpdateUrl={mockSetUpdateUrl}
      />,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders headers correctly', () => {
    setup();
    const keyInputs = screen.getAllByLabelText('Key');
    const valueInputs = screen.getAllByLabelText('Value');

    expect(keyInputs[0]).toHaveValue('Authorization');
    expect(valueInputs[0]).toHaveValue('Bearer token');

    expect(keyInputs[1]).toHaveValue('Content-Type');
    expect(valueInputs[1]).toHaveValue('application/json');
  });

  it('adds a new header when "Add Header" button is clicked', () => {
    setup();
    const addButton = screen.getByText('Add Header');
    fireEvent.click(addButton);

    expect(mockSetHeaders).toHaveBeenCalledWith([
      ...initialHeaders,
      { key: '', value: '' },
    ]);
  });

  it('deletes a header when delete button is clicked', () => {
    setup();
    const deleteButton = screen.getAllByTestId('DeleteIcon')[0];
    fireEvent.click(deleteButton);

    expect(mockSetHeaders).toHaveBeenCalledWith([
      { key: 'Content-Type', value: 'application/json' },
    ]);
    expect(mockSetUpdateUrl).toHaveBeenCalled();
  });

  it('updates the URL correctly when headers change', () => {
    setup();
    const keyInput = screen.getAllByLabelText('Key')[0];
    fireEvent.change(keyInput, { target: { value: 'NewAuthorization' } });

    expect(mockSetUpdateUrl).toHaveBeenCalled();
  });

  it('handles empty headers correctly', () => {
    render(
      <HeadersEditor
        headers={[]}
        setHeaders={mockSetHeaders}
        updateUrl="http://localhost"
        setUpdateUrl={mockSetUpdateUrl}
      />,
    );

    const addButton = screen.getByText('Add Header');
    fireEvent.click(addButton);

    expect(mockSetHeaders).toHaveBeenCalledWith([{ key: '', value: '' }]);
  });

  it('handles updating the value of a header', () => {
    setup();
    const valueInput = screen.getAllByLabelText('Value')[0];
    fireEvent.change(valueInput, { target: { value: 'NewToken' } });

    expect(mockSetHeaders).toHaveBeenCalledWith([
      { key: 'Authorization', value: 'NewToken' },
      { key: 'Content-Type', value: 'application/json' },
    ]);
    expect(mockSetUpdateUrl).toHaveBeenCalled();
  });

  it('handles removing a header when only one exists', () => {
    render(
      <HeadersEditor
        headers={[{ key: 'Authorization', value: 'Bearer token' }]}
        setHeaders={mockSetHeaders}
        updateUrl="http://localhost"
        setUpdateUrl={mockSetUpdateUrl}
      />,
    );

    const deleteButton = screen.getAllByTestId('DeleteIcon')[0];
    fireEvent.click(deleteButton);

    expect(mockSetHeaders).toHaveBeenCalledWith([]);
    expect(mockSetUpdateUrl).toHaveBeenCalled();
  });
});

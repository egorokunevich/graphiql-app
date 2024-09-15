import { render, screen, fireEvent } from '@testing-library/react';

import RestHeaderEditor from '@/src/components/RestClient/RestHeaderEditor';


type TranslationKeys =
  | 'client.key'
  | 'client.value'
  | 'client.addHeader'
  | 'client.delete';

const mockTranslations: Record<TranslationKeys, string> = {
  'client.key': 'Key',
  'client.value': 'Value',
  'client.addHeader': 'Add header',
  'client.delete': 'Delete',
};

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) =>
    mockTranslations[key as TranslationKeys] || key,
}));

describe('RestHeaderEditor', () => {
  const setHeadersMock = jest.fn();

  test('renders headers and allows adding/removing', () => {
    render(
      <RestHeaderEditor
        headers={[{ key: 'Authorization', value: 'Bearer token' }]}
        setHeaders={setHeadersMock}
      />
    );

    const keyField = screen.getByLabelText(/key/i) as HTMLInputElement;
    const valueField = screen.getByLabelText(/value/i) as HTMLInputElement;
    const addButton = screen.getByText(/add header/i);

    expect(keyField.value).toBe('Authorization');
    expect(valueField.value).toBe('Bearer token');

    fireEvent.click(addButton);

    expect(setHeadersMock).toHaveBeenCalledTimes(1);
  });

  test('handles header removal', () => {
    render(
      <RestHeaderEditor
        headers={[{ key: 'Authorization', value: 'Bearer token' }]}
        setHeaders={setHeadersMock}
      />
    );

    const deleteButton = screen.getByTestId('delete-button');
    fireEvent.click(deleteButton);

    expect(setHeadersMock).toHaveBeenCalled();
  });
});

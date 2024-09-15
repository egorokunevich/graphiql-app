import { screen, fireEvent, waitFor } from '@testing-library/react';

import RequestEditor from '@/src/components/GraphiQLClient/RequestEditor';
import { encodeBase64 } from '@/src/utils/base64';
import { render } from '@src/tests/test-utils';

jest.mock('@monaco-editor/react', () => ({
  __esModule: true,
  default: ({ value, onChange, onMount }) => {
    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.oninput = (e) => onChange(e.target.value);
    return (
      <textarea
        data-testid="monaco-editor"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() =>
          onMount({ ...textarea, onDidBlurEditorText: (cb: Function) => cb() })
        }
      />
    );
  },
}));

jest.mock('@/src/utils/base64', () => ({
  encodeBase64: jest
    .fn()
    .mockImplementation((str: string) => Buffer.from(str).toString('base64')),
}));

const mockSetBody = jest.fn();

const initialProps = {
  body: 'query { field }',
  setBody: mockSetBody,
};

test('renders component with initial value', () => {
  render(<RequestEditor {...initialProps} />);
  const editor = screen.getByTestId('monaco-editor') as HTMLTextAreaElement;
  expect(editor.value).toBe('query { field }');
});

test('calls setBody on value change', () => {
  render(<RequestEditor {...initialProps} />);
  const editor = screen.getByTestId('monaco-editor') as HTMLTextAreaElement;
  fireEvent.change(editor, { target: { value: 'query { newField }' } });
  expect(mockSetBody).toHaveBeenCalledWith('query { newField }');
});

test('formats GraphQL query on prettify button click', async () => {
  render(<RequestEditor {...initialProps} />);
  const editor = screen.getByTestId('monaco-editor') as HTMLTextAreaElement;
  fireEvent.change(editor, { target: { value: 'query{field}' } });
  const prettifyButton = screen.getByText('Prettify');
  fireEvent.click(prettifyButton);

  await waitFor(() => {
    expect(editor.value).toBe('query { field }');
  });
});

test('updates URL with base64 encoded body on editor blur', () => {
  render(<RequestEditor {...initialProps} />);
  const editor = screen.getByTestId('monaco-editor') as HTMLTextAreaElement;
  fireEvent.blur(editor);

  const encodedBody = encodeBase64('query { field }');
  const url = new URL(window.location.href);
  expect(url.searchParams.get('body')).toBe(encodedBody);
});

test('removes body from URL if empty on editor blur', () => {
  render(<RequestEditor body="" setBody={mockSetBody} />);
  const editor = screen.getByTestId('monaco-editor') as HTMLTextAreaElement;
  fireEvent.blur(editor);

  const url = new URL(window.location.href);
  expect(url.searchParams.get('body')).toBeNull();
});

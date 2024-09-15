import { render, screen, fireEvent } from '@testing-library/react';

import VariablesEditor from '@/src/components/GraphiQLClient/VariablesEditor';

jest.mock('@monaco-editor/react', () => ({
  __esModule: true,
  default: ({ value, onChange }) => {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        data-testid="monaco-editor"
      />
    );
  },
}));

const mockSetVariables = jest.fn();

const initialProps = {
  variables: '{"key": "value"}',
  setVariables: mockSetVariables,
};

test('renders component with initial value', () => {
  render(<VariablesEditor {...initialProps} />);
  const editor = screen.getByTestId('monaco-editor') as HTMLTextAreaElement;
  expect(editor.value).toBe('{"key": "value"}');
});

test('calls setVariables on value change', () => {
  render(<VariablesEditor {...initialProps} />);
  const editor = screen.getByTestId('monaco-editor') as HTMLTextAreaElement;
  fireEvent.change(editor, { target: { value: '{"key": "newValue"}' } });
  expect(mockSetVariables).toHaveBeenCalledWith('{"key": "newValue"}');
});

test('renders component with empty initial value', () => {
  render(<VariablesEditor {...initialProps} variables="" />);
  const editor = screen.getByTestId('monaco-editor') as HTMLTextAreaElement;
  expect(editor.value).toBe('');
});

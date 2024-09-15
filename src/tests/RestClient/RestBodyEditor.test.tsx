import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import RestBodyEditor from '@/src/components/RestClient/RestBodyEditor';

jest.mock('@monaco-editor/react', () => ({
  __esModule: true,
  default: ({ onMount, value }) => {
    const editor = {
      getValue: () => value,
      setValue: jest.fn(),
      onDidBlurEditorText: jest.fn((callback) => {
        callback();
      }),
    };
    if (onMount) {
      onMount(editor);
    }
    return <div data-testid="monaco-editor"></div>;
  },
}));

jest.mock('next-intl', () => ({
  useTranslations: () => (key) => key,
}));

describe('RestBodyEditor', () => {
  const setBodyMock = jest.fn();
  const setVariablesMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly and handles body change', () => {
    const { container } = render(
      <RestBodyEditor
        body="{}"
        setBody={setBodyMock}
        variables={[]}
        setVariables={setVariablesMock}
      />,
    );

    const editor = container.querySelector('[data-testid="monaco-editor"]');
    if (editor) {
      const monacoEditor = editor.__monacoEditor;
      if (monacoEditor) {
        monacoEditor.setValue('{ "key": "value" }');

        monacoEditor.onDidBlurEditorText.mock.calls.forEach(([callback]) =>
          callback(),
        );
        expect(setBodyMock).toHaveBeenCalledWith('{ "key": "value" }');
      }
    }
  });

  test('handles Prettify JSON formatting', async () => {
    render(
      <RestBodyEditor
        body='{ "key": "value" }'
        setBody={setBodyMock}
        variables={[]}
        setVariables={setVariablesMock}
      />,
    );

    const prettifyButton = screen.getByText('Prettify');
    fireEvent.click(prettifyButton);

    await waitFor(() => {
      const expectedValue = `{
  "key": "value"
}`;
      expect(setBodyMock).toHaveBeenCalledWith(expectedValue);
    });
  });

  test('toggles variables visibility', () => {
    render(
      <RestBodyEditor
        body=""
        setBody={setBodyMock}
        variables={[]}
        setVariables={setVariablesMock}
      />,
    );

    const toggleButton = screen.getByTestId('toggle-variables-button');
    fireEvent.click(toggleButton);

    expect(screen.getByText('Add Variable')).toBeInTheDocument();
  });
});

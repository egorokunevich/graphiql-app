import { render, screen, fireEvent } from '@testing-library/react';

import { RestVariablesEditor } from '@/src/components/RestClient/RestVariablesEditor';

describe('RestVariablesEditor', () => {
  const setVariablesMock = jest.fn();

  test('renders variables and allows adding/removing', () => {
    render(
      <RestVariablesEditor
        variables={[{ key: 'var1', value: 'value1' }]}
        setVariables={setVariablesMock}
      />,
    );

    const keyInput = screen.getByLabelText('Key');
    fireEvent.change(keyInput, { target: { value: 'newKey' } });

    expect(setVariablesMock).toHaveBeenCalled();
  });

  test('handles variable removal', () => {
    render(
      <RestVariablesEditor
        variables={[{ key: 'var1', value: 'value1' }]}
        setVariables={setVariablesMock}
      />,
    );

    fireEvent.click(screen.getByTestId('delete-button'));
  expect(setVariablesMock).toHaveBeenCalled();
  });

  test('handles variable addition', () => {
    render(
      <RestVariablesEditor variables={[]} setVariables={setVariablesMock} />,
    );

    fireEvent.click(screen.getByText('Add Variable'));
    expect(setVariablesMock).toHaveBeenCalled();
  });
});

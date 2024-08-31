import { Add, Delete } from '@mui/icons-material';
import { Box, Button, IconButton, TextField } from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';

interface RestVariablesEditorProps {
  body: string;
  setBody: Dispatch<SetStateAction<string>>;
}

export const RestVariablesEditor = ({
  body,
  setBody,
}: RestVariablesEditorProps) => {
  const [variables, setVariables] = useState([{ key: '', value: '' }]);

  const handleAddVariable = () => {
    setVariables([...variables, { key: '', value: '' }]);
  };

  const handleRemoveVariable = (index: number) => {
    const updatedVariables = variables.filter((_, i) => i !== index);
    setVariables(updatedVariables);
  };

  const handleVariableChange = (index: number, key: string, value: string) => {
    const updatedVariables = variables.map((variable, i) =>
      i === index ? { ...variable, [key]: value } : variable,
    );
    setVariables(updatedVariables);
  };

  return (
    <Box sx={{ padding: '0', width: '100%' }}>
      {variables.map((variable, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 1,
            width: '100%',
          }}
        >
          <TextField
            label="Key"
            value={variable.key}
            onChange={(e) => handleVariableChange(index, 'key', e.target.value)}
            sx={{ marginRight: 1, width: '100%' }}
          />
          <TextField
            label="Value"
            value={variable.value}
            onChange={(e) =>
              handleVariableChange(index, 'value', e.target.value)
            }
            sx={{ marginRight: 1, width: '100%' }}
          />
          <IconButton onClick={() => handleRemoveVariable(index)}>
            <Delete />
          </IconButton>
        </Box>
      ))}
      <Button startIcon={<Add />} onClick={handleAddVariable}>
        Add Variable
      </Button>
    </Box>
  );
};

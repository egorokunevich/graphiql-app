import MonacoEditor from '@monaco-editor/react';
import { Box } from '@mui/material';
import React from 'react';

import { VariablesEditorProps } from '@/src/types/index';

export default function VariablesEditor({
  variables,
  setVariables,
}: VariablesEditorProps) {
  const handleVariablesChange = (value: string | undefined) => {
    setVariables(value ?? '');
  };

  return (
    <Box sx={{ padding: 1, backgroundColor: '#F0F7F4', borderRadius: 1 }}>
      <MonacoEditor
        height="200px"
        language="json"
        value={variables}
        onChange={handleVariablesChange}
        theme="vs-grey"
        options={{
          minimap: { enabled: false },
          formatOnPaste: true,
          automaticLayout: true,
          fontSize: 14,
        }}
      />
    </Box>
  );
}

import MonacoEditor from '@monaco-editor/react';
import { Box } from '@mui/material';
import React, { useState } from 'react';

interface RequestEditorProps {
  body: string;
  setBody: (newUrl: string) => void;
}

export default function RequestEditor({ body, setBody }: RequestEditorProps) {
  const handleChange = (value: string | undefined) => {
    if (value !== undefined) {
      setBody(value);
    }
  };

  return (
    <Box sx={{ padding: 1, backgroundColor: '#F0F7F4', borderRadius: 1 }}>
      {/* <Button onClick={handlePrettify} variant="outlined" sx={{ marginTop: 2 }}>
                Prettify Query
            </Button> */}
      <MonacoEditor
        height="200px"
        language={'graphql'}
        value={body}
        onChange={handleChange}
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

import { Box, Paper } from '@mui/material';
import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { SdlViewerProps } from '@/src/types/index';



export default function SdlViewer({ sdlResponse }: SdlViewerProps) {
  const response = JSON.stringify(sdlResponse, null, 6);
  return (
    <Paper
      sx={{
        boxShadow: 'none',
        borderTop: 1,
        borderColor: 'divider',
        borderRadius: 'unset',
        height: '100%',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
        }}
      >
        <SyntaxHighlighter
          language="json"
          style={docco}
          customStyle={{
            margin: 0,
            width: '100%',
            overflowY: 'auto',
            height: '370px',
            backgroundColor: '#F0F7F4',
            padding: '0',
          }}
          showLineNumbers={true}
          lineNumberStyle={{ color: '#888888' }}
        >
          {response !== null ? response : '{}'}
        </SyntaxHighlighter>
      </Box>
    </Paper>
  );
}

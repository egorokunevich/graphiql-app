import { Box, Typography, Paper } from '@mui/material';
import { useTranslations } from 'next-intl';
import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import xml from 'react-syntax-highlighter/dist/esm/languages/hljs/xml';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { SdlViewerProps } from '@/src/types/index';

SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('html', xml);

export const SdlResponseViewer = ({ sdlResponse, loading }: SdlViewerProps) => {
  const t = useTranslations('client');

  const isJson = (data: string): boolean => {
    try {
      JSON.parse(data);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <Paper
      sx={{
        boxShadow: 'none',
        borderTop: 1,
        borderColor: 'divider',
        borderRadius: 'unset',
        height: '100%',
        alignSelf: 'flex-end',
        width: '100%',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {loading ? (
          <Typography variant="subtitle1" sx={{ marginTop: 10 }}>
            Loading...
          </Typography>
        ) : (
          <Box
            component="pre"
            sx={{
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all',
              maxHeight: '370px',
              minHeight: '370px',
              overflowY: 'auto',
              height: '100%',
              borderRadius: 1,
              width: '100%',
            }}
          >
            {typeof sdlResponse?.data === 'string' ? (
              isJson(sdlResponse.data) ? (
                <SyntaxHighlighter
                  language="json"
                  style={docco}
                  customStyle={{
                    margin: 0,
                    height: '100%',
                    backgroundColor: '#F0F7F4',
                    padding: '0',
                  }}
                  showLineNumbers={true}
                  lineNumberStyle={{ color: '#888888' }}
                >
                  {sdlResponse.data !== null ? sdlResponse.data : '{}'}
                </SyntaxHighlighter>
              ) : (
                <SyntaxHighlighter
                  language="html"
                  style={docco}
                  customStyle={{
                    margin: 0,
                    height: '100%',
                    backgroundColor: '#F0F7F4',
                    padding: '0',
                  }}
                  showLineNumbers={true}
                  lineNumberStyle={{ color: '#888888' }}
                >
                  {sdlResponse.data !== null ? sdlResponse.data : '{}'}
                </SyntaxHighlighter>
              )
            ) : (
              <SyntaxHighlighter
                language="json"
                style={docco}
                customStyle={{
                  margin: 0,
                  height: '100%',
                  backgroundColor: '#F0F7F4',
                  padding: '0',
                }}
                showLineNumbers={true}
                lineNumberStyle={{ color: '#888888' }}
              >
                {sdlResponse?.data !== null
                  ? JSON.stringify(sdlResponse?.data, null, 2)
                  : '{}'}
              </SyntaxHighlighter>
            )}
          </Box>
        )}
      </Box>
    </Paper>
  );
};

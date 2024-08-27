import { Box, Typography, Paper } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import xml from 'react-syntax-highlighter/dist/esm/languages/hljs/xml';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { ResponseType } from '@/app/[lang]/client/rest-client/page';


SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('html', xml);

interface ResponseViewerProps {
  response: ResponseType<unknown> | null;
}

export const ResponseViewer = ({ response }: ResponseViewerProps) => {
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
        padding: 1,
        maxHeight: '500px',
        overflowY: 'auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Typography variant="h6" fontWeight="400" color="#707070">
            Status:
          </Typography>
          {response && (
            <Typography
              variant="h6"
              fontWeight="400"
              color={response?.message ? 'error' : 'green'}
            >
              {response?.message
                ? `${response.status} Request Failed`
                : `${response?.status} OK`}
            </Typography>
          )}
        </Box>
        <Typography variant="h6" fontWeight="400" color="#707070">
          Response
        </Typography>
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {response ? (
          response.message ? (
            <Box
              sx={{
                marginTop: 3,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <Image
                src="/static/astronaut.svg"
                alt="astronaut"
                width={200}
                height={200}
              />
              <Typography color="#454545" variant="subtitle2">
                Could not send request
              </Typography>
            </Box>
          ) : (
            <Box
              component="pre"
              sx={{
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
                maxHeight: '330px',
                overflowY: 'auto',
                padding: 1,
                borderRadius: 1,
              }}
            >
              {typeof response.data === 'string' ? (
                isJson(response.data) ? (
                  <SyntaxHighlighter
                    language="json"
                    style={docco}
                    customStyle={{ backgroundColor: '#F0F7F4' }}
                    showLineNumbers={true}
                    lineNumberStyle={{ color: '#888888' }}
                  >
                    {response.data}
                  </SyntaxHighlighter>
                ) : (
                  <SyntaxHighlighter
                    language="html"
                    style={docco}
                    customStyle={{ backgroundColor: '#F0F7F4' }}
                    showLineNumbers={true}
                    lineNumberStyle={{ color: '#888888' }}
                  >
                    {response.data}
                  </SyntaxHighlighter>
                )
              ) : (
                <SyntaxHighlighter
                  language="json"
                  style={docco}
                  customStyle={{ backgroundColor: '#F0F7F4' }}
                  showLineNumbers={true}
                  lineNumberStyle={{ color: '#888888' }}
                >
                  {JSON.stringify(response.data, null, 2)}
                </SyntaxHighlighter>
              )}
            </Box>
          )
        ) : (
          <Box
            sx={{
              marginTop: 3,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <Image
              src="/static/illustration.svg"
              alt=""
              width={200}
              height={200}
            />
            <Typography color="#454545" variant="subtitle2" gutterBottom>
              Enter the URL and click Send to get a response
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

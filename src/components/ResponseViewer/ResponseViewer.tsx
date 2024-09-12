import { Box, Typography, Paper } from '@mui/material';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import xml from 'react-syntax-highlighter/dist/esm/languages/hljs/xml';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { ResponseViewerProps } from '@/src/types/index';

SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('html', xml);

export const ResponseViewer = ({
  response,
  tabGraphiql,
}: ResponseViewerProps) => {
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
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        {!tabGraphiql && (
          <Typography variant="h6" fontWeight="400" color="#707070">
            {t('response')}:
          </Typography>
        )}
        <Box sx={{ display: 'flex' }}>
          <Typography variant="h6" fontWeight="400" color="#707070">
            {t('status')}:
          </Typography>
          {response && (
            <Typography
              variant="h6"
              fontWeight="400"
              color={response?.message ? 'error' : 'green'}
              data-testid="graphiql-response"
            >
              {response?.message
                ? `${response.status} ${response.message}`
                : `${response?.status} OK`}
            </Typography>
          )}
        </Box>
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
              <Box
                sx={{
                  width: 200,
                  height: 200,
                  position: 'relative',
                }}
              >
                <Image
                  src="/static/astronaut.svg"
                  alt="astronaut"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </Box>
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
                maxHeight: '370px',
                minHeight: '370px',
                overflowY: 'auto',
                height: '100%',
                borderRadius: 1,
                width: '100%',
              }}
            >
              {typeof response.data === 'string' ? (
                isJson(response.data) ? (
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
                    {response.data !== null ? response.data : '{}'}
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
                    {response.data !== null ? response.data : '{}'}
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
                  {response.data !== null
                    ? JSON.stringify(response.data, null, 2)
                    : '{}'}
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
            <Box
              sx={{
                width: 200,
                height: 200,
                position: 'relative',
              }}
            >
              <Image
                src="/static/illustration.svg"
                alt="illustration"
                fill
                style={{ objectFit: 'contain' }}
              />
            </Box>
            <Typography color="#454545" variant="subtitle2" gutterBottom>
              {t('welcome')}
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

'use client';

import MonacoEditor from '@monaco-editor/react';
import { Box, Button } from '@mui/material';
import { parse, print } from 'graphql';
import * as monaco from 'monaco-editor';
import { useTranslations } from 'next-intl';
import React, { useEffect, useRef } from 'react';

import { RequestEditorProps } from '@/src/types/index';
import { encodeBase64 } from '@/src/utils/base64';

export default function RequestEditor({ body, setBody }: RequestEditorProps) {
  const t = useTranslations();
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const bodyRef = useRef(body);

  const formatGraphQL = (query: string) => {
    try {
      const parsed = parse(query);
      return print(parsed);
    } catch (e) {
      return query;
    }
  };

  useEffect(() => {
    bodyRef.current = body;
  }, [body]);

  const handleChange = (value: string | undefined) => {
    setBody(value ?? '');
  };

  const handleEditorBlur = () => {
    const currentBody = bodyRef.current;
    const currentUrl = new URL(window.location.href);

    if (currentBody && currentBody.trim() !== '') {
      const encodedBody = encodeBase64(currentBody);
      currentUrl.searchParams.set('body', encodedBody);
    } else {
      currentUrl.searchParams.delete('body');
    }
    window.history.replaceState({}, '', currentUrl.toString());
  };

  const handlePrettify = () => {
    try {
      if (editorRef.current) {
        const unformattedCode = editorRef.current.getValue();
        const formattedCode = formatGraphQL(unformattedCode);
        editorRef.current.setValue(formattedCode);
      }
    } catch (error) {
      return;
    }
  };

  return (
    <Box sx={{ padding: 1, backgroundColor: '#F0F7F4', borderRadius: 1 }}>
      <Button
        onClick={handlePrettify}
        variant="outlined"
        sx={{ margin: '0 0 5px 0' }}
      >
        {t('client.prettify')}
      </Button>
      <MonacoEditor
        height="300px"
        language={'graphql'}
        value={body}
        onChange={handleChange}
        onMount={(editor: monaco.editor.IStandaloneCodeEditor) => {
          editorRef.current = editor;
          editor.onDidBlurEditorText(handleEditorBlur);
        }}
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

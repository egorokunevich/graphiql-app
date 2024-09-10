import MonacoEditor from '@monaco-editor/react';
import { Box } from '@mui/material';
import type * as Monaco from 'monaco-editor';
import React, { useEffect, useRef } from 'react';

import { RequestEditorProps } from '@/src/types/index';
import { encodeBase64 } from '@/src/utils/base64';

export default function RequestEditor({ body, setBody }: RequestEditorProps) {
  const editorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null);
  const bodyRef = useRef(body);

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

  // const handlePrettify = () => {
  //   if (editorRef.current) {
  //     const unformattedCode = editorRef.current.getValue();
  //     const formattedCode = formatGraphQL(unformattedCode);
  //     editorRef.current.setValue(formattedCode);
  //   }
  // };

  return (
    <Box sx={{ padding: 1, backgroundColor: '#F0F7F4', borderRadius: 1 }}>
      {/* <Button onClick={handlePrettify} variant="outlined" sx={{ marginTop: 2 }}>
                Prettify Query
            </Button> */}
      <MonacoEditor
        height="300px"
        language={'graphql'}
        value={body}
        onChange={handleChange}
        onMount={(editor: Monaco.editor.IStandaloneCodeEditor) => {
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

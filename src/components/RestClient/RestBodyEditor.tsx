import MonacoEditor from '@monaco-editor/react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Radio,
  FormControl,
  FormControlLabel,
  RadioGroup,
  IconButton,
  Typography,
  Button,
} from '@mui/material';
import { parse, print } from 'graphql';
import * as monaco from 'monaco-editor';
import { useTranslations } from 'next-intl';
import React, { useEffect, useRef, useState } from 'react';

import { RestVariablesEditor } from '@/src/components/RestClient/RestVariablesEditor';
import useEditorBlur from '@/src/hooks/useEditorBlue';
import { RestBodyEditorProps } from '@/src/types/index';

const RestBodyEditor: React.FC<RestBodyEditorProps> = ({
  body,
  setBody,
  variables,
  setVariables,
}) => {
  const t = useTranslations('client');
  const [language, setLanguage] = useState<string>('json');
  const [showVariables, setShowVariables] = useState(false);
  const [hovered, setHovered] = useState(false);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const bodyRef = useRef(body);

  useEffect(() => {
    bodyRef.current = body;
  }, [body]);

  const formatGraphQL = (query: string) => {
    try {
      const parsed = parse(query);
      return print(parsed);
    } catch (e) {
      console.error('GraphQL parsing error:', e);
      return query;
    }
  };

  const formatJSON = (json: string) => {
    try {
      const parsed = JSON.parse(json);
      return JSON.stringify(parsed, null, 4); 
    } catch (e) {
      console.error('JSON parsing error:', e);
      return json;
    }
  };

  const formatPlainText = (text: string) => {
    return text.trim().replace(/\s+/g, ' ');
  };

  const toggleVariablesVisibility = () => {
    setShowVariables((prev) => !prev);
  };

  const handleChange = (value: string | undefined) => {
    setBody(value ?? '');
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLanguage(event.target.value);
  };

  const handleEditorBlur = useEditorBlur(bodyRef);

  const handlePrettify = () => {
    try {
      if (editorRef.current) {
        const unformattedCode = editorRef.current.getValue();
        let formattedCode: string;

        switch (language) {
          case 'json':
            formattedCode = formatJSON(unformattedCode);
            break;
          case 'plaintext':
            formattedCode = formatPlainText(unformattedCode);
            break;
          default:
            formattedCode = formatGraphQL(unformattedCode);
            break;
        }

        if (
          editorRef.current &&
          typeof editorRef.current.setValue === 'function'
        ) {
          editorRef.current.setValue(formattedCode);
        } else {
          console.error(
            'Editor not properly initialized or setValue is not a function',
          );
        }
      }
    } catch (error) {
      console.error('Prettify error:', error);
    }
  };

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <IconButton
          onClick={toggleVariablesVisibility}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          sx={{ fontSize: '14px' }}
        >
          {!showVariables ? <VisibilityOff /> : <Visibility />}
        </IconButton>
        {!showVariables && hovered && (
          <Typography
            variant="h6"
            sx={{
              position: 'absolute',
              fontSize: '14px',
              background: '#e8e8e8',
              top: '-12px',
            }}
          >
            Variables
          </Typography>
        )}
      </Box>
      {showVariables && (
        <RestVariablesEditor
          variables={variables}
          setVariables={setVariables}
        />
      )}
      <Box sx={{ padding: 1, backgroundColor: '#F0F7F4', borderRadius: 1 }}>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="language"
            name="language"
            value={language}
            onChange={handleLanguageChange}
            row
          >
            <FormControlLabel
              sx={{ '& .MuiFormControlLabel-label': { fontSize: '14px' } }}
              value="json"
              control={<Radio size="small" />}
              label="JSON"
            />
            <FormControlLabel
              sx={{ '& .MuiFormControlLabel-label': { fontSize: '14px' } }}
              value="plaintext"
              control={<Radio size="small" />}
              label={t('plainText')}
            />
            <Button
              onClick={handlePrettify}
              variant="outlined"
              sx={{ display: 'inline-block' }}
            >
              Prettify
            </Button>
          </RadioGroup>
        </FormControl>

        <MonacoEditor
          height="200px"
          language={language === 'json' ? 'json' : 'plaintext'}
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
    </>
  );
};

export default RestBodyEditor;

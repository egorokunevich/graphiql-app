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
} from '@mui/material';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';

import { RestVariablesEditor } from '@src/components/RestVariablesEditor/RestVariablesEditor';

interface RestBodyEditorProps {
  body: string;
  setBody: Dispatch<SetStateAction<string>>;
}

const RestBodyEditor: React.FC<RestBodyEditorProps> = ({ body, setBody }) => {
  const [language, setLanguage] = useState<string>('json');
  const previousBodyRef = useRef<string>(body);
  const [showVariables, setShowVariables] = useState(false);
  const [hovered, setHovered] = useState(false);

  const toggleVariablesVisibility = () => {
    setShowVariables((prev) => !prev);
  };

  const handleChange = (value: string | undefined) => {
    if (value !== undefined) {
      setBody(value);
    }
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLanguage(event.target.value);
  };

  const updateUrlWithEncodedBody = () => {
    try {
      let updatedBody = body;

      if (language === 'json') {
        const parsed = JSON.parse(body);
        updatedBody = JSON.stringify(parsed, null, 2);
      }
      if (updatedBody !== previousBodyRef.current) {
        const base64Body = btoa(updatedBody);

        const url = new URL(window.location.href);
        url.searchParams.set('encodedBody', base64Body);
        window.history.pushState({}, '', url.toString());

        previousBodyRef.current = updatedBody;
      }
    } catch (error) {
      console.error('Failed to parse JSON or update URL:', error);
    }
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const pathSegments = url.pathname.split('/');
    if (pathSegments.length > 1) {
      try {
        const lastSegment = pathSegments[pathSegments.length - 1];
        const isBase64 = /^[A-Za-z0-9+/=]+$/.test(lastSegment);
        if (isBase64) {
          const decodedBody = atob(lastSegment);
          try {
            setBody(decodedBody);
          } catch (error) {
            console.error('Failed to set body from decoded string:', error);
          }
          url.searchParams.delete('body');
          window.history.replaceState({}, '', url.toString());
        }
      } catch (error) {
        console.error('Failed to decode base64 string:', error);
      }
    }
  }, []);

  useEffect(() => {
    const handleFocusOut = (event: FocusEvent) => {
      if (
        event.relatedTarget === null ||
        !(
          event.relatedTarget instanceof Node &&
          document.contains(event.relatedTarget)
        )
      ) {
        updateUrlWithEncodedBody();
      }
    };

    window.addEventListener('focusout', handleFocusOut);
    return () => {
      window.removeEventListener('focusout', handleFocusOut);
    };
  }, [body, language]);

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
              fontSize: '12px',
              background: '#e8e8e8',
            }}
          >
            Variables
          </Typography>
        )}
      </Box>
      {showVariables && <RestVariablesEditor body={body} setBody={setBody} />}
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
              label="Plain Text"
            />
          </RadioGroup>
        </FormControl>

        <MonacoEditor
          height="200px"
          language={language === 'json' ? 'json' : 'plaintext'}
          value={body}
          onChange={handleChange}
          theme="vs-grey"
          options={{
            fontSize: 14,
          }}
        />
      </Box>
    </>
  );
};

export default RestBodyEditor;

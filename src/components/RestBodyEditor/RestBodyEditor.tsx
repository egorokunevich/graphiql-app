import MonacoEditor from '@monaco-editor/react';
import {
  Box,
  Radio,
  FormControl,
  FormControlLabel,
  RadioGroup,
} from '@mui/material';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';

interface RestBodyEditorProps {
  body: string;
  setBody: Dispatch<SetStateAction<string>>;
}

const RestBodyEditor: React.FC<RestBodyEditorProps> = ({ body, setBody }) => {
  const [language, setLanguage] = useState<string>('json');
  const previousBodyRef = useRef<string>(body);

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
        url.pathname = `${url.pathname.split('/').slice(0, -1).join('/')}/${base64Body}`;
        window.history.pushState({}, '', url.toString());

        previousBodyRef.current = updatedBody;
      }
    } catch (error) {
      console.error('Failed to parse JSON or update URL:', error);
    }
  };

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
            sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.75rem' } }}
            value="json"
            control={<Radio size="small" />}
            label="JSON"
          />
          <FormControlLabel
            sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.75rem' } }}
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
        theme="vs-white"
      />
    </Box>
  );
};

export default RestBodyEditor;

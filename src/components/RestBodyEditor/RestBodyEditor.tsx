import MonacoEditor from '@monaco-editor/react';
import {
  Box,
  Radio,
  FormControl,
  FormControlLabel,
  RadioGroup,
} from '@mui/material';
import { useTranslations } from 'next-intl';
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
  const t = useTranslations('client');
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
        atob(lastSegment);
        url.searchParams.delete('body');
        window.history.replaceState({}, '', url.toString());
      } catch (error) {
        console.error(error);
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
        </RadioGroup>
      </FormControl>

      <MonacoEditor
        height="200px"
        language={language === 'json' ? 'json' : 'plaintext'}
        value={body}
        onChange={handleChange}
        theme="vs-white"
        options={{
          fontSize: 14,
        }}
      />
    </Box>
  );
};

export default RestBodyEditor;

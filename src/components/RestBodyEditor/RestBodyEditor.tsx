import MonacoEditor from '@monaco-editor/react';
import EditorDidMount from '@monaco-editor/react';
import {
  Box,
  Radio,
  FormControl,
  FormControlLabel,
  RadioGroup,
} from '@mui/material';
import parserBabel from 'prettier/parser-babel';
import prettier from 'prettier/standalone';
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from 'react';

interface RestBodyEditorProps {
  body: string;
  setBody: Dispatch<SetStateAction<string>>;
}

const RestBodyEditor: React.FC<RestBodyEditorProps> = ({ body, setBody }) => {
  const [language, setLanguage] = useState<string>('json');
  const editorRef = useRef(null);

  const handleChange = (value: string | undefined) => {
    if (value !== undefined) {
      setBody(value);
    }
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLanguage(event.target.value);
  };

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
        // editorDidMount={editorDidMount}
        // onBlur={handleBlur}
        theme="vs-white"
      />
    </Box>
  );
};

export default RestBodyEditor;

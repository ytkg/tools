import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import ToolPageLayout from '../components/ToolPageLayout';
import { useTranslation } from 'react-i18next';

const Base64Converter: React.FC = () => {
  const { t } = useTranslation();
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [error, setError] = useState('');

  const handleEncode = () => {
    try {
      const encoded = btoa(inputText);
      setOutputText(encoded);
      setError('');
    } catch (e) {
      if (e instanceof Error) {
        setError(t('tools.base64-converter.error_encoding', { message: e.message }));
      } else {
        setError(t('tools.base64-converter.error_unknown_encoding'));
      }
      setOutputText('');
    }
  };

  const handleDecode = () => {
    try {
      const decoded = atob(inputText);
      setOutputText(decoded);
      setError('');
    } catch (e) {
      if (e instanceof Error) {
        setError(t('tools.base64-converter.error_decoding', { message: e.message }));
      } else {
        setError(t('tools.base64-converter.error_unknown_decoding'));
      }
      setOutputText('');
    }
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setError('');
  };

  return (
    <ToolPageLayout
      title={t('tools.base64-converter.name')}
      description={t('tools.base64-converter.description')}
    >
      <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ width: { xs: '100%', md: '50%' } }}>
          <TextField
            label={t('tools.base64-converter.inputLabel')}
            multiline
            rows={10}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            variant="outlined"
            fullWidth
            error={!!error}
            helperText={error}
          />
        </Box>
        <Box sx={{ width: { xs: '100%', md: '50%' } }}>
          <TextField
            label={t('tools.base64-converter.outputLabel')}
            multiline
            rows={10}
            value={outputText}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
            fullWidth
          />
        </Box>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" onClick={handleEncode} sx={{ mr: 1 }}>
          {t('tools.base64-converter.encode_button')}
        </Button>
        <Button variant="contained" onClick={handleDecode} sx={{ mr: 1 }}>
          {t('tools.base64-converter.decode_button')}
        </Button>
        <Button variant="outlined" onClick={handleClear}>
          {t('tools.base64-converter.clear_button')}
        </Button>
      </Box>
    </ToolPageLayout>
  );
};

export default Base64Converter;

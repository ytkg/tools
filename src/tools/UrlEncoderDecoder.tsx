import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import ToolPageLayout from '../components/ToolPageLayout';
import { useTranslation } from 'react-i18next';

const UrlEncoderDecoder: React.FC = () => {
  const { t } = useTranslation();
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [error, setError] = useState('');

  const handleEncode = () => {
    try {
      const encoded = encodeURIComponent(inputText);
      setOutputText(encoded);
      setError('');
    } catch (e) {
      if (e instanceof Error) {
        setError(t('tools.url-encoder-decoder.error_encoding', { message: e.message }));
      } else {
        setError(t('tools.url-encoder-decoder.error_unknown_encoding'));
      }
      setOutputText('');
    }
  };

  const handleDecode = () => {
    try {
      const decoded = decodeURIComponent(inputText);
      setOutputText(decoded);
      setError('');
    } catch (e) {
      if (e instanceof Error) {
        setError(t('tools.url-encoder-decoder.error_decoding', { message: e.message }));
      } else {
        setError(t('tools.url-encoder-decoder.error_unknown_decoding'));
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
      title={t('tools.url-encoder-decoder.name')}
      description={t('tools.url-encoder-decoder.description')}
    >
      <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ width: { xs: '100%', md: '50%' } }}>
          <TextField
            label={t('tools.url-encoder-decoder.input_label')}
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
            label={t('tools.url-encoder-decoder.output_label')}
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
          {t('tools.url-encoder-decoder.encode_button')}
        </Button>
        <Button variant="contained" onClick={handleDecode} sx={{ mr: 1 }}>
          {t('tools.url-encoder-decoder.decode_button')}
        </Button>
        <Button variant="outlined" onClick={handleClear}>
          {t('tools.url-encoder-decoder.clear_button')}
        </Button>
      </Box>
    </ToolPageLayout>
  );
};

export default UrlEncoderDecoder;

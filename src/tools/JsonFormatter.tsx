import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import ToolPageLayout from '../components/ToolPageLayout';
import { useTranslation } from 'react-i18next';

const JsonFormatter: React.FC = () => {
  const { t } = useTranslation();
  const [inputJson, setInputJson] = useState('');
  const [outputJson, setOutputJson] = useState('');
  const [error, setError] = useState('');

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(inputJson);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutputJson(formatted);
      setError('');
    } catch (e) {
      if (e instanceof Error) {
        setError(t('tools.json-formatter.error_invalid', { message: e.message }));
      } else {
        setError(t('tools.json-formatter.error_unknown'));
      }
      setOutputJson('');
    }
  };

  const handleClear = () => {
    setInputJson('');
    setOutputJson('');
    setError('');
  };

  return (
    <ToolPageLayout
      title={t('tools.json-formatter.name')}
      description={t('tools.json-formatter.description')}
    >
      <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ width: { xs: '100%', md: '50%' } }}>
          <TextField
            label={t('tools.json-formatter.input_label')}
            multiline
            rows={20}
            value={inputJson}
            onChange={(e) => setInputJson(e.target.value)}
            variant="outlined"
            fullWidth
            error={!!error}
            helperText={error}
          />
        </Box>
        <Box sx={{ width: { xs: '100%', md: '50%' } }}>
          <TextField
            label={t('tools.json-formatter.output_label')}
            multiline
            rows={20}
            value={outputJson}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
            fullWidth
          />
        </Box>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" onClick={handleFormat} sx={{ mr: 1 }}>
          {t('tools.json-formatter.format_button')}
        </Button>
        <Button variant="outlined" onClick={handleClear}>
          {t('tools.json-formatter.clear_button')}
        </Button>
      </Box>
    </ToolPageLayout>
  );
};

export default JsonFormatter;

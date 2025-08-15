import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import ToolPageLayout from '../components/ToolPageLayout';

const JsonFormatter: React.FC = () => {
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
        setError('Invalid JSON: ' + e.message);
      } else {
        setError('An unknown error occurred while parsing JSON.');
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
      title="JSON Formatter"
      description="Format and validate JSON documents."
    >
      <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ width: { xs: '100%', md: '50%' } }}>
          <TextField
            label="Input JSON"
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
            label="Formatted JSON"
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
          Format
        </Button>
        <Button variant="outlined" onClick={handleClear}>
          Clear
        </Button>
      </Box>
    </ToolPageLayout>
  );
};

export default JsonFormatter;

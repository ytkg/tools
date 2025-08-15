import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Box } from '@mui/material';

const Base64Converter: React.FC = () => {
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
        setError('Error encoding: ' + e.message);
      } else {
        setError('An unknown encoding error occurred.');
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
        setError('Invalid Base64 string: ' + e.message);
      } else {
        setError('An unknown decoding error occurred.');
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
    <Paper sx={{ p: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Base64 Converter
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ width: { xs: '100%', md: '50%' } }}>
          <TextField
            label="Input"
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
            label="Output"
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
          Encode
        </Button>
        <Button variant="contained" onClick={handleDecode} sx={{ mr: 1 }}>
          Decode
        </Button>
        <Button variant="outlined" onClick={handleClear}>
          Clear
        </Button>
      </Box>
    </Paper>
  );
};

export default Base64Converter;

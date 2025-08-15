import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';

const UrlEncoderDecoder: React.FC = () => {
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
        setError('Error encoding: ' + e.message);
      } else {
        setError('An unknown encoding error occurred.');
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
        setError('Invalid URL encoding: ' + e.message);
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
        URL Encoder / Decoder
      </Typography>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <TextField
            label="Input / Output"
            multiline
            rows={10}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            variant="outlined"
            fullWidth
            error={!!error}
            helperText={error}
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            label="Result"
            multiline
            rows={10}
            value={outputText}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid xs={12}>
          <Button variant="contained" onClick={handleEncode} sx={{ mr: 1 }}>
            Encode
          </Button>
          <Button variant="contained" onClick={handleDecode} sx={{ mr: 1 }}>
            Decode
          </Button>
          <Button variant="outlined" onClick={handleClear}>
            Clear
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UrlEncoderDecoder;

import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';

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
    <Paper sx={{ p: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        JSON Formatter
      </Typography>
      <Grid container spacing={2}>
        <Grid xs={12} md={6}>
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
        </Grid>
        <Grid xs={12} md={6}>
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
        </Grid>
      </Grid>
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" onClick={handleFormat} sx={{ mr: 1 }}>
          Format
        </Button>
        <Button variant="outlined" onClick={handleClear}>
          Clear
        </Button>
      </Box>
    </Paper>
  );
};

export default JsonFormatter;

import React, { useState, useEffect } from 'react';
import PageMeta from '../components/PageMeta';
import { TextField, Button, Typography, Paper, Box } from '@mui/material';

const UnixTimestampConverter: React.FC = () => {
  const [currentTimestamp, setCurrentTimestamp] = useState(Math.floor(Date.now() / 1000));
  const [timestampInput, setTimestampInput] = useState<string>(String(currentTimestamp));
  const [humanDateOutput, setHumanDateOutput] = useState<string>('');
  const [humanDateInput, setHumanDateInput] = useState<string>(new Date().toLocaleString());
  const [timestampOutput, setTimestampOutput] = useState<string>('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTimestamp(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleTimestampToDate = () => {
    const ts = parseInt(timestampInput, 10);
    if (!isNaN(ts)) {
      // Auto-detect seconds vs milliseconds
      const date = new Date(ts * (String(ts).length === 10 ? 1000 : 1));
      setHumanDateOutput(date.toUTCString() + " | " + date.toLocaleString());
    } else {
      setHumanDateOutput('Invalid Timestamp');
    }
  };

  const handleDateToTimestamp = () => {
    try {
      const date = new Date(humanDateInput);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date format");
      }
      setTimestampOutput(String(Math.floor(date.getTime() / 1000)));
    } catch {
      setTimestampOutput('Invalid Date');
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <PageMeta title="Unix Timestamp Converter" description="Convert between Unix timestamps and human-readable dates." />
      <Typography variant="h4" component="h1" gutterBottom>
        Unix Timestamp Converter
      </Typography>

      <Paper sx={{ p: 2, mb: 2, textAlign: 'center' }}>
        <Typography variant="h6">Current Timestamp</Typography>
        <Typography fontFamily="monospace">{currentTimestamp}</Typography>
      </Paper>

      <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ width: { xs: '100%', md: '50%' } }}>
          <Typography variant="h6" gutterBottom>Timestamp to Date</Typography>
          <TextField
            label="Unix Timestamp"
            value={timestampInput}
            onChange={(e) => setTimestampInput(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ mb: 1 }}
          />
          <Button variant="contained" onClick={handleTimestampToDate}>Convert</Button>
          <Typography sx={{ mt: 2, fontFamily: 'monospace', minHeight: '2em' }}>{humanDateOutput}</Typography>
        </Box>

        <Box sx={{ width: { xs: '100%', md: '50%' } }}>
          <Typography variant="h6" gutterBottom>Date to Timestamp</Typography>
          <TextField
            label="Date/Time String"
            value={humanDateInput}
            onChange={(e) => setHumanDateInput(e.target.value)}
            variant="outlined"
            fullWidth
            helperText="e.g., 2024-08-15 10:00:00"
            sx={{ mb: 1 }}
          />
          <Button variant="contained" onClick={handleDateToTimestamp}>Convert</Button>
          <Typography data-testid="date-to-ts-output" sx={{ mt: 2, fontFamily: 'monospace', minHeight: '2em' }}>{timestampOutput}</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default UnixTimestampConverter;

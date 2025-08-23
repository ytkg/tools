import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, Box } from '@mui/material';
import ToolPageLayout from '../components/ToolPageLayout';
import { useTranslation } from 'react-i18next';

const UnixTimestampConverter: React.FC = () => {
  const { t } = useTranslation();
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
      setHumanDateOutput(t('tools.unix-timestamp.invalid_ts_error'));
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
      setTimestampOutput(t('tools.unix-timestamp.invalid_date_error'));
    }
  };

  return (
    <ToolPageLayout
      title={t('tools.unix-timestamp.name')}
      description={t('tools.unix-timestamp.description')}
    >
      <Paper sx={{ p: 2, mb: 2, textAlign: 'center' }}>
        <Typography variant="h6">{t('tools.unix-timestamp.current_timestamp_label')}</Typography>
        <Typography fontFamily="monospace">{currentTimestamp}</Typography>
      </Paper>

      <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ width: { xs: '100%', md: '50%' } }}>
          <Typography variant="h6" gutterBottom>{t('tools.unix-timestamp.ts_to_date_title')}</Typography>
          <TextField
            label={t('tools.unix-timestamp.ts_input_label')}
            value={timestampInput}
            onChange={(e) => setTimestampInput(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ mb: 1 }}
          />
          <Button variant="contained" onClick={handleTimestampToDate}>{t('tools.unix-timestamp.convert_button')}</Button>
          <Typography sx={{ mt: 2, fontFamily: 'monospace', minHeight: '2em' }}>{humanDateOutput}</Typography>
        </Box>

        <Box sx={{ width: { xs: '100%', md: '50%' } }}>
          <Typography variant="h6" gutterBottom>{t('tools.unix-timestamp.date_to_ts_title')}</Typography>
          <TextField
            label={t('tools.unix-timestamp.date_input_label')}
            value={humanDateInput}
            onChange={(e) => setHumanDateInput(e.target.value)}
            variant="outlined"
            fullWidth
            helperText={t('tools.unix-timestamp.date_input_helper')}
            sx={{ mb: 1 }}
          />
          <Button variant="contained" onClick={handleDateToTimestamp}>{t('tools.unix-timestamp.convert_button')}</Button>
          <Typography data-testid="date-to-ts-output" sx={{ mt: 2, fontFamily: 'monospace', minHeight: '2em' }}>{timestampOutput}</Typography>
        </Box>
      </Box>
    </ToolPageLayout>
  );
};

export default UnixTimestampConverter;

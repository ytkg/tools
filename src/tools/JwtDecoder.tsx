import React, { useState, useMemo } from 'react';
import { TextField, Paper, Typography, Box } from '@mui/material';
import type { JwtPayload } from 'jwt-decode';
import { jwtDecode } from 'jwt-decode';
import ToolPageLayout from '../components/ToolPageLayout';
import { useTranslation } from 'react-i18next';

interface DecodedJwt {
  header: object;
  payload: JwtPayload;
}

const JwtDecoder: React.FC = () => {
  const { t } = useTranslation();
  const [token, setToken] = useState<string>('');
  const [error, setError] = useState<string>('');

  const decodedToken: DecodedJwt | null = useMemo(() => {
    if (!token) return null;
    try {
      const header = jwtDecode(token, { header: true });
      const payload = jwtDecode<JwtPayload>(token);
      setError('');
      return { header, payload };
    } catch (e) {
      if (e instanceof Error) {
        setError(t('tools.jwt-decoder.error_invalid', { message: e.message }));
      } else {
        setError(t('tools.jwt-decoder.error_unknown'));
      }
      return null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <ToolPageLayout
      title={t('tools.jwt-decoder.name')}
      description={t('tools.jwt-decoder.description')}
    >
      <TextField
        label={t('tools.jwt-decoder.input_label')}
        multiline
        rows={8}
        value={token}
        onChange={(e) => setToken(e.target.value)}
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        error={!!error}
        helperText={error}
      />
      {decodedToken && (
        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
          <Box sx={{ width: { xs: '100%', md: '50%' } }}>
            <Typography variant="h6" gutterBottom>{t('tools.jwt-decoder.header_title')}</Typography>
            <Paper data-testid="jwt-header" component="pre" sx={{ p: 2, overflowX: 'auto', bgcolor: 'background.default' }}>
              {JSON.stringify(decodedToken.header, null, 2)}
            </Paper>
          </Box>
          <Box sx={{ width: { xs: '100%', md: '50%' } }}>
            <Typography variant="h6" gutterBottom>{t('tools.jwt-decoder.payload_title')}</Typography>
            <Paper data-testid="jwt-payload" component="pre" sx={{ p: 2, overflowX: 'auto', bgcolor: 'background.default' }}>
              {JSON.stringify(decodedToken.payload, null, 2)}
            </Paper>
          </Box>
        </Box>
      )}
    </ToolPageLayout>
  );
};

export default JwtDecoder;

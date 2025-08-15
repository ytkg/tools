import React, { useState, useMemo } from 'react';
import PageMeta from '../components/PageMeta';
import { TextField, Paper, Typography, Box } from '@mui/material';
import type { JwtPayload } from 'jwt-decode';
import { jwtDecode } from 'jwt-decode';

interface DecodedJwt {
  header: object;
  payload: JwtPayload;
}

const JwtDecoder: React.FC = () => {
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
        setError('Invalid JWT Token: ' + e.message);
      } else {
        setError('An unknown error occurred.');
      }
      return null;
    }
  }, [token]);

  return (
    <Paper sx={{ p: 2 }}>
      <PageMeta title="JWT Decoder" description="Decode JSON Web Tokens and view their contents." />
      <Typography variant="h4" component="h1" gutterBottom>
        JWT Decoder
      </Typography>
      <TextField
        label="JWT Token"
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
            <Typography variant="h6" gutterBottom>Header</Typography>
            <Paper data-testid="jwt-header" component="pre" sx={{ p: 2, overflowX: 'auto', bgcolor: 'background.default' }}>
              {JSON.stringify(decodedToken.header, null, 2)}
            </Paper>
          </Box>
          <Box sx={{ width: { xs: '100%', md: '50%' } }}>
            <Typography variant="h6" gutterBottom>Payload</Typography>
            <Paper data-testid="jwt-payload" component="pre" sx={{ p: 2, overflowX: 'auto', bgcolor: 'background.default' }}>
              {JSON.stringify(decodedToken.payload, null, 2)}
            </Paper>
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default JwtDecoder;

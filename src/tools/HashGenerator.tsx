import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Grid, CircularProgress } from '@mui/material';

async function generateHash(algorithm: string, text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

const HashGenerator: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [hashes, setHashes] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const algorithms = ['SHA-1', 'SHA-256', 'SHA-512'];
    const newHashes: Record<string, string> = {};
    for (const alg of algorithms) {
      newHashes[alg] = await generateHash(alg, inputText);
    }
    setHashes(newHashes);
    setLoading(false);
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Hash Generator
      </Typography>
      <TextField
        label="Input Text"
        multiline
        rows={8}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        onClick={handleGenerate}
        disabled={loading || !inputText}
        startIcon={loading ? <CircularProgress size={20} /> : null}
      >
        {loading ? 'Generating...' : 'Generate Hashes'}
      </Button>
      {Object.keys(hashes).length > 0 && (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {Object.entries(hashes).map(([alg, hash]) => (
            <Grid xs={12} key={alg}>
              <Typography variant="h6" component="h3">{alg}</Typography>
              <Paper component="pre" sx={{ p: 2, overflowX: 'auto', bgcolor: 'background.default', wordBreak: 'break-all' }}>
                {hash}
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Paper>
  );
};

export default HashGenerator;

import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, CircularProgress, Box } from '@mui/material';
import ToolPageLayout from '../components/ToolPageLayout';
import { useTranslation } from 'react-i18next';

async function generateHash(algorithm: string, text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

const HashGenerator: React.FC = () => {
  const { t } = useTranslation();
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
    <ToolPageLayout
      title={t('tools.hash-generator.name')}
      description={t('tools.hash-generator.description')}
    >
      <TextField
        label={t('tools.hash-generator.input_label')}
        multiline
        rows={8}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
      />
      <Box sx={{ mb: 2 }}>
        <Button
          variant="contained"
          onClick={handleGenerate}
          disabled={loading || !inputText}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {loading ? t('tools.hash-generator.generating_button') : t('tools.hash-generator.generate_button')}
        </Button>
      </Box>
      {Object.keys(hashes).length > 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {Object.entries(hashes).map(([alg, hash]) => (
            <Box key={alg}>
              <Typography variant="h6" component="h3">{alg}</Typography>
              <Paper component="pre" sx={{ p: 2, overflowX: 'auto', bgcolor: 'background.default', wordBreak: 'break-all' }}>
                {hash}
              </Paper>
            </Box>
          ))}
        </Box>
      )}
    </ToolPageLayout>
  );
};

export default HashGenerator;

import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import ToolPageLayout from '../components/ToolPageLayout';

const UuidGenerator: React.FC = () => {
  const [uuid, setUuid] = useState('');
  const [copied, setCopied] = useState(false);

  const generateUuid = () => {
    setUuid(crypto.randomUUID());
    setCopied(false);
  };

  useEffect(() => {
    generateUuid();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(uuid).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <ToolPageLayout
      title="UUID/GUID Generator"
      description="Generate v4 UUIDs (Universally Unique Identifiers)."
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="body1">
          Generated v4 UUID:
        </Typography>
        <TextField
          value={uuid}
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
          fullWidth
        />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="contained" onClick={generateUuid}>
            Generate New UUID
          </Button>
          <Button variant="outlined" onClick={handleCopy}>
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </Button>
        </Box>
      </Box>
    </ToolPageLayout>
  );
};

export default UuidGenerator;

import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import ToolPageLayout from '../components/ToolPageLayout';

const ImageToBase64Converter: React.FC = () => {
  const [base64, setBase64] = useState('');
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file.');
        setFileName('');
        setBase64('');
        return;
      }

      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const result = loadEvent.target?.result;
        if (typeof result === 'string') {
          setBase64(result);
          setError('');
        } else {
          setError('Failed to read file.');
          setBase64('');
        }
      };
      reader.onerror = () => {
        setError('Error reading file.');
        setBase64('');
      };
      reader.readAsDataURL(file);
      setFileName(file.name);
    }
  };

  const handleCopy = () => {
    if (base64) {
      navigator.clipboard.writeText(base64).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <ToolPageLayout
      title="Image to Base64 Converter"
      description="Convert image files to Base64 data URLs."
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button variant="contained" component="label">
          Upload Image
          <input type="file" hidden accept="image/*" onChange={handleFileChange} />
        </Button>
        {fileName && <Typography>Selected file: {fileName}</Typography>}
        {error && <Typography color="error">{error}</Typography>}

        <TextField
          label="Base64 Output"
          multiline
          rows={10}
          value={base64}
          InputProps={{ readOnly: true }}
          variant="outlined"
          fullWidth
          placeholder="Base64 representation will appear here..."
        />

        <Button variant="outlined" onClick={handleCopy} disabled={!base64}>
          {copied ? 'Copied!' : 'Copy to Clipboard'}
        </Button>
      </Box>
    </ToolPageLayout>
  );
};

export default ImageToBase64Converter;

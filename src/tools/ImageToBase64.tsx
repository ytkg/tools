import React, { useState } from 'react';
import {
  Button,
  Box,
  Typography,
  Paper,
  TextField,
  Tooltip,
  IconButton,
} from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ToolPageLayout from '../components/ToolPageLayout';

const ImageToBase64: React.FC = () => {
  const [base64, setBase64] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        setError('Please upload a valid image file.');
        setImageSrc('');
        setBase64('');
        return;
    }

    setError('');
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImageSrc(result);
      setBase64(result);
    };
    reader.onerror = () => {
        setError('Failed to read the image file.');
        setImageSrc('');
        setBase64('');
    };
    reader.readAsDataURL(file);
  };

  const handleCopy = () => {
    if (base64) {
      navigator.clipboard.writeText(base64);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <ToolPageLayout
      title="Image to Base64 Converter"
      description="Upload an image to convert it into a Base64 string."
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button variant="contained" component="label">
          Upload Image
          <input type="file" hidden accept="image/*" onChange={handleImageUpload} data-testid="file-input" />
        </Button>

        {error && <Typography color="error">{error}</Typography>}

        {imageSrc && (
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
            <img src={imageSrc} alt="Uploaded preview" style={{ maxWidth: '100%', maxHeight: '300px' }} />
          </Paper>
        )}

        <TextField
          label="Base64 String"
          multiline
          rows={8}
          value={base64}
          InputProps={{
            readOnly: true,
            endAdornment: (
                <Tooltip title={copied ? 'Copied!' : 'Copy to Clipboard'}>
                  <span>
                    <IconButton onClick={handleCopy} disabled={!base64} sx={{ position: 'absolute', right: 8, top: 8 }}>
                        <FileCopyIcon />
                    </IconButton>
                  </span>
                </Tooltip>
            ),
          }}
          fullWidth
          variant="outlined"
          sx={{ mt: 2 }}
        />
      </Box>
    </ToolPageLayout>
  );
};

export default ImageToBase64;

import React, { useState } from 'react';
import PageMeta from '../components/PageMeta';
import { TextField, Typography, Paper, Slider, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { QRCodeCanvas } from 'qrcode.react';

const QrCodeGenerator: React.FC = () => {
  const [text, setText] = useState('https://github.com');
  const [size, setSize] = useState(256);
  const [level, setLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');

  return (
    <Paper sx={{ p: 2 }}>
      <PageMeta title="QR Code Generator" description="Generate QR codes from text or URLs." />
      <Typography variant="h4" component="h1" gutterBottom>
        QR Code Generator
      </Typography>
      <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ flexGrow: 1 }}>
          <TextField
            label="Text to encode"
            value={text}
            onChange={(e) => setText(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <Typography gutterBottom>QR Code Size: {size}px</Typography>
          <Slider
            value={size}
            onChange={(_, newValue) => setSize(newValue as number)}
            aria-labelledby="qr-code-size-slider"
            valueLabelDisplay="auto"
            step={64}
            marks
            min={128}
            max={512}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth>
            <InputLabel id="qr-level-label">Error Correction Level</InputLabel>
            <Select
              labelId="qr-level-label"
              value={level}
              label="Error Correction Level"
              onChange={(e) => setLevel(e.target.value as 'L' | 'M' | 'Q' | 'H')}
            >
              <MenuItem value="L">Low (L)</MenuItem>
              <MenuItem value="M">Medium (M)</MenuItem>
              <MenuItem value="Q">Quartile (Q)</MenuItem>
              <MenuItem value="H">High (H)</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
          <Paper sx={{ p: 2, display: 'inline-block' }}>
            <QRCodeCanvas
              value={text}
              size={size}
              level={level}
            />
          </Paper>
        </Box>
      </Box>
    </Paper>
  );
};

export default QrCodeGenerator;

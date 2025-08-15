import React, { useState, useCallback } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { TextField, Typography, Paper, Box } from '@mui/material';

// Basic color conversion functions
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

const ColorConverter: React.FC = () => {
  const [hex, setHex] = useState('#1976D2');
  const [rgb, setRgb] = useState('rgb(25, 118, 210)');

  const updateColorsFromHex = useCallback((newHex: string) => {
    setHex(newHex);
    const rgbVal = hexToRgb(newHex);
    if (rgbVal) {
      setRgb(`rgb(${rgbVal.r}, ${rgbVal.g}, ${rgbVal.b})`);
    }
  }, []);

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateColorsFromHex(e.target.value);
  };

  const handleRgbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRgb(e.target.value);
    const match = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/.exec(e.target.value);
    if (match) {
      const [, r, g, b] = match.map(Number);
      if ([r, g, b].every(v => v >= 0 && v <= 255)) {
        setHex(rgbToHex(r, g, b));
      }
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Helmet>
        <title>Color Converter | Developer Tools</title>
        <meta name="description" content="Convert between HEX and RGB color codes." />
      </Helmet>
      <Typography variant="h4" component="h1" gutterBottom>
        Color Converter
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
        <Box>
          <Box
            sx={{
              width: 100,
              height: 100,
              backgroundColor: hex,
              border: '1px solid grey',
              borderRadius: 1,
              cursor: 'pointer',
              position: 'relative',
            }}
          >
             <input
                type="color"
                value={hex}
                onChange={handleHexChange}
                style={{ width: '100%', height: '100%', opacity: 0, cursor: 'pointer', position: 'absolute' }}
              />
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="HEX"
            value={hex}
            onChange={handleHexChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="RGB"
            value={rgb}
            onChange={handleRgbChange}
            variant="outlined"
            fullWidth
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default ColorConverter;

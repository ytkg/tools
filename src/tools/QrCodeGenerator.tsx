import React, { useState } from 'react';
import { TextField, Typography, Paper, Slider, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { QRCodeCanvas } from 'qrcode.react';
import ToolPageLayout from '../components/ToolPageLayout';
import { useTranslation } from 'react-i18next';

const QrCodeGenerator: React.FC = () => {
  const { t } = useTranslation();
  const [text, setText] = useState('https://github.com');
  const [size, setSize] = useState(256);
  const [level, setLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');

  return (
    <ToolPageLayout
      title={t('tools.qr-code-generator.name')}
      description={t('tools.qr-code-generator.description')}
    >
      <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ flexGrow: 1 }}>
          <TextField
            label={t('tools.qr-code-generator.input_label')}
            value={text}
            onChange={(e) => setText(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <Typography gutterBottom>{t('tools.qr-code-generator.size_label', { size })}</Typography>
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
          <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'stretch', sm: 'flex-start' } }}>
            <FormControl fullWidth sx={{ flex: 1 }}>
              <InputLabel id="qr-level-label" shrink>{t('tools.qr-code-generator.level_label')}</InputLabel>
              <Select
                labelId="qr-level-label"
                value={level}
                label={t('tools.qr-code-generator.level_label')}
                onChange={(e) => setLevel(e.target.value as 'L' | 'M' | 'Q' | 'H')}
              >
                <MenuItem value="L">{t('tools.qr-code-generator.level_l')}</MenuItem>
                <MenuItem value="M">{t('tools.qr-code-generator.level_m')}</MenuItem>
                <MenuItem value="Q">{t('tools.qr-code-generator.level_q')}</MenuItem>
                <MenuItem value="H">{t('tools.qr-code-generator.level_h')}</MenuItem>
              </Select>
            </FormControl>
            <TextField
              type="color"
              label={t('tools.qr-code-generator.fg_color_label')}
              value={fgColor}
              onChange={(e) => setFgColor(e.target.value)}
              fullWidth
              inputProps={{ 'aria-label': 'tools.qr-code-generator.fg_color_label' }}
              sx={{ flex: 1 }}
            />
            <TextField
              type="color"
              label={t('tools.qr-code-generator.bg_color_label')}
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              fullWidth
              inputProps={{ 'aria-label': 'tools.qr-code-generator.bg_color_label' }}
              sx={{ flex: 1 }}
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
          <Paper sx={{ p: 2, display: 'inline-block' }}>
            <QRCodeCanvas
              value={text}
              size={size}
              level={level}
              fgColor={fgColor}
              bgColor={bgColor}
            />
          </Paper>
        </Box>
      </Box>
    </ToolPageLayout>
  );
};

export default QrCodeGenerator;

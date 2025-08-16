import React, { useState, useMemo } from 'react';
import {
  TextField,
  Typography,
  Paper,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from '@mui/material';
import ToolPageLayout from '../components/ToolPageLayout';

const conversionTypes = ['Length', 'Weight', 'Temperature'];

const units = {
  Length: ['meters', 'feet'],
  Weight: ['kilograms', 'pounds'],
  Temperature: ['Celsius', 'Fahrenheit'],
};

const UnitConverter: React.FC = () => {
  const [conversionType, setConversionType] = useState(conversionTypes[0]);
  const [fromUnit, setFromUnit] = useState(units[conversionType][0]);
  const [toUnit, setToUnit] = useState(units[conversionType][1]);
  const [inputValue, setInputValue] = useState('1');

  const outputValue = useMemo(() => {
    const input = parseFloat(inputValue);
    if (isNaN(input)) {
      return '';
    }

    // Length
    if (fromUnit === 'meters' && toUnit === 'feet') return (input * 3.28084).toFixed(5);
    if (fromUnit === 'feet' && toUnit === 'meters') return (input / 3.28084).toFixed(5);

    // Weight
    if (fromUnit === 'kilograms' && toUnit === 'pounds') return (input * 2.20462).toFixed(5);
    if (fromUnit === 'pounds' && toUnit === 'kilograms') return (input / 2.20462).toFixed(5);

    // Temperature
    if (fromUnit === 'Celsius' && toUnit === 'Fahrenheit') return ((input * 9/5) + 32).toFixed(5);
    if (fromUnit === 'Fahrenheit' && toUnit === 'Celsius') return ((input - 32) * 5/9).toFixed(5);

    if (fromUnit === toUnit) return input.toString();

    return '';
  }, [inputValue, fromUnit, toUnit]);

  const handleConversionTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newType = event.target.value as keyof typeof units;
    setConversionType(newType);
    setFromUnit(units[newType][0]);
    setToUnit(units[newType][1]);
  };

  return (
    <ToolPageLayout
      title="Unit Converter"
      description="Convert common units of length, weight, and temperature."
    >
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <FormControl fullWidth>
          <InputLabel id="conversion-type-label">Conversion Type</InputLabel>
          <Select
            labelId="conversion-type-label"
            id="conversion-type-select"
            value={conversionType}
            onChange={handleConversionTypeChange}
            label="Conversion Type"
          >
            {conversionTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={5}>
            <FormControl fullWidth>
              <InputLabel id="from-unit-label">From</InputLabel>
              <Select
                labelId="from-unit-label"
                id="from-unit-select"
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                label="From"
              >
                {units[conversionType].map((unit) => (
                  <MenuItem key={unit} value={unit}>
                    {unit}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2} sx={{ textAlign: 'center' }}>
            <Typography>to</Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <FormControl fullWidth>
              <InputLabel id="to-unit-label">To</InputLabel>
              <Select
                labelId="to-unit-label"
                id="to-unit-select"
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                label="To"
              >
                {units[conversionType].map((unit) => (
                  <MenuItem key={unit} value={unit}>
                    {unit}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={5}>
            <TextField
              label="Input"
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={2} sx={{ textAlign: 'center' }}>
            <Typography>=</Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 2, textAlign: 'center', width: '100%' }}>
              <Typography variant="h6">{outputValue}</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </ToolPageLayout>
  );
};

export default UnitConverter;

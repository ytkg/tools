import React, { useState, useMemo, useCallback } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
} from '@mui/material';
import ToolPageLayout from '../components/ToolPageLayout';

type ConversionType = 'length' | 'weight' | 'temperature';

const conversionOptions = {
  length: [
    { unit: 'm', label: 'Meters' },
    { unit: 'ft', label: 'Feet' },
    { unit: 'in', label: 'Inches' },
    { unit: 'cm', label: 'Centimeters' },
  ],
  weight: [
    { unit: 'kg', label: 'Kilograms' },
    { unit: 'lb', label: 'Pounds' },
  ],
  temperature: [
    { unit: 'c', label: 'Celsius' },
    { unit: 'f', label: 'Fahrenheit' },
  ],
};

const UnitConverter: React.FC = () => {
  const [conversionType, setConversionType] = useState<ConversionType>('length');
  const [fromUnit, setFromUnit] = useState<string>('m');
  const [toUnit, setToUnit] = useState<string>('ft');
  const [inputValue, setInputValue] = useState<string>('1');
  const [outputValue, setOutputValue] = useState<string>('');

  const handleConversion = useCallback((input: string, from: string, to: string) => {
    const value = parseFloat(input);
    if (isNaN(value)) {
      setOutputValue('');
      return;
    }

    let result: number;
    let baseValue: number; // For length and weight, convert to a base unit first (meters/kg)

    if (from === to) {
      setOutputValue(input);
      return;
    }

    switch (conversionType) {
      case 'length':
        if (from === 'm') baseValue = value;
        else if (from === 'ft') baseValue = value / 3.28084;
        else if (from === 'in') baseValue = value / 39.3701;
        else if (from === 'cm') baseValue = value / 100;
        else baseValue = value;

        if (to === 'm') result = baseValue;
        else if (to === 'ft') result = baseValue * 3.28084;
        else if (to === 'in') result = baseValue * 39.3701;
        else if (to === 'cm') result = baseValue * 100;
        else result = value;
        break;
      case 'weight':
        if (from === 'kg') baseValue = value;
        else if (from === 'lb') baseValue = value / 2.20462;
        else baseValue = value;

        if (to === 'kg') result = baseValue;
        else if (to === 'lb') result = baseValue * 2.20462;
        else result = value;
        break;
      case 'temperature':
        if (from === 'c' && to === 'f') result = (value * 9/5) + 32;
        else if (from === 'f' && to === 'c') result = (value - 32) * 5/9;
        else result = value;
        break;
      default:
        result = value;
    }

    setOutputValue(result.toFixed(4));
  }, [conversionType]);

  useMemo(() => {
    handleConversion(inputValue, fromUnit, toUnit);
  }, [inputValue, fromUnit, toUnit, handleConversion]);

  const handleTypeChange = (type: ConversionType) => {
    setConversionType(type);
    const options = conversionOptions[type];
    setFromUnit(options[0].unit);
    setToUnit(options[1].unit);
    setInputValue('1');
  };

  return (
    <ToolPageLayout
      title="Unit Converter"
      description="Convert common units of length, weight, and temperature."
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Conversion Type</InputLabel>
          <Select
            value={conversionType}
            label="Conversion Type"
            onChange={(e) => handleTypeChange(e.target.value as ConversionType)}
          >
            <MenuItem value="length">Length</MenuItem>
            <MenuItem value="weight">Weight</MenuItem>
            <MenuItem value="temperature">Temperature</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            label="Value"
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            variant="outlined"
            fullWidth
          />
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>From</InputLabel>
            <Select
              value={fromUnit}
              label="From"
              onChange={(e) => setFromUnit(e.target.value)}
            >
              {conversionOptions[conversionType].map((opt) => (
                <MenuItem key={opt.unit} value={opt.unit}>{opt.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography variant="h5">=</Typography>
          <TextField
            label="Result"
            value={outputValue}
            InputProps={{ readOnly: true }}
            variant="outlined"
            fullWidth
          />
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>To</InputLabel>
            <Select
              value={toUnit}
              label="To"
              onChange={(e) => setToUnit(e.target.value)}
            >
              {conversionOptions[conversionType].map((opt) => (
                <MenuItem key={opt.unit} value={opt.unit}>{opt.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </ToolPageLayout>
  );
};

export default UnitConverter;

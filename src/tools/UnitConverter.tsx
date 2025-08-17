import React, { useState, useMemo } from 'react';
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

  const handleConversion = (input: string, from: string, to: string) => {
    const value = parseFloat(input);
    if (isNaN(value)) {
      setOutputValue('');
      return;
    }

    let result: number;

    // Length
    if (from === 'm' && to === 'ft') result = value * 3.28084;
    else if (from === 'ft' && to === 'm') result = value / 3.28084;
    // Weight
    else if (from === 'kg' && to === 'lb') result = value * 2.20462;
    else if (from === 'lb' && to === 'kg') result = value / 2.20462;
    // Temperature
    else if (from === 'c' && to === 'f') result = (value * 9/5) + 32;
    else if (from === 'f' && to === 'c') result = (value - 32) * 5/9;
    else {
      result = value; // Same unit
    }

    setOutputValue(result.toFixed(4));
  };

  useMemo(() => {
    handleConversion(inputValue, fromUnit, toUnit);
  }, [inputValue, fromUnit, toUnit]);

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

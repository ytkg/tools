import React, { useState, useCallback } from 'react';
import { TextField, Typography, Paper, Box } from '@mui/material';

type Base = 'dec' | 'hex' | 'bin' | 'oct';

const NumberBaseConverter: React.FC = () => {
  const [values, setValues] = useState({
    dec: '',
    hex: '',
    bin: '',
    oct: '',
  });
  const [error, setError] = useState<Base | null>(null);

  const handleValueChange = useCallback((base: Base, value: string) => {
    setError(null);
    let numValue: number;

    if (value === '') {
      setValues({ dec: '', hex: '', bin: '', oct: '' });
      return;
    }

    try {
      switch (base) {
        case 'dec':
          numValue = parseInt(value, 10);
          break;
        case 'hex':
          if (!/^[0-9a-fA-F]*$/.test(value)) throw new Error('Invalid hex');
          numValue = parseInt(value, 16);
          break;
        case 'bin':
          if (!/^[01]*$/.test(value)) throw new Error('Invalid binary');
          numValue = parseInt(value, 2);
          break;
        case 'oct':
          if (!/^[0-7]*$/.test(value)) throw new Error('Invalid octal');
          numValue = parseInt(value, 8);
          break;
        default:
          return;
      }

      if (isNaN(numValue)) {
        setValues({ ...values, [base]: value });
        return;
      }

      setValues({
        dec: numValue.toString(10),
        hex: numValue.toString(16),
        bin: numValue.toString(2),
        oct: numValue.toString(8),
      });
    } catch {
      setError(base);
      setValues({ ...values, [base]: value });
    }
  }, [values]);

  const createTextField = (base: Base, label: string) => (
    <TextField
      label={label}
      value={values[base]}
      onChange={(e) => handleValueChange(base, e.target.value)}
      variant="outlined"
      fullWidth
      error={error === base}
      helperText={error === base ? `Invalid ${label.toLowerCase()} input` : ''}
      sx={{ mb: 2 }}
    />
  );

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Number Base Converter
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        {createTextField('dec', 'Decimal')}
        {createTextField('hex', 'Hexadecimal')}
        {createTextField('bin', 'Binary')}
        {createTextField('oct', 'Octal')}
      </Box>
    </Paper>
  );
};

export default NumberBaseConverter;

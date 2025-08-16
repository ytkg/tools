import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ToolPageLayout from '../components/ToolPageLayout';

const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [copied, setCopied] = useState(false);

  const charsets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
  };

  const generatePassword = () => {
    let availableChars = '';
    let result = '';

    const selectedOptions = Object.entries(options).filter(([, value]) => value);
    if (selectedOptions.length === 0) {
        setPassword('');
        return;
    }

    selectedOptions.forEach(([key]) => {
      availableChars += charsets[key as keyof typeof charsets];
      // Ensure at least one character from each selected set
      result += charsets[key as keyof typeof charsets][Math.floor(Math.random() * charsets[key as keyof typeof charsets].length)];
    });

    for (let i = result.length; i < length; i++) {
      result += availableChars[Math.floor(Math.random() * availableChars.length)];
    }

    // Shuffle the result to avoid predictable starting characters
    setPassword(result.split('').sort(() => 0.5 - Math.random()).join(''));
  };

  useEffect(() => {
    generatePassword();
  }, [length, options]);

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOptions({
      ...options,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <ToolPageLayout
      title="Password Generator"
      description="Generate strong, random passwords with customizable options."
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Generated Password"
          value={password}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <Tooltip title={copied ? 'Copied!' : 'Copy to Clipboard'}>
                <IconButton onClick={handleCopy} disabled={!password}>
                  <FileCopyIcon />
                </IconButton>
              </Tooltip>
            ),
          }}
          fullWidth
        />

        <FormControl component="fieldset" variant="standard">
          <FormLabel component="legend">Password Length</FormLabel>
          <Slider
            value={length}
            onChange={(_, newValue) => setLength(newValue as number)}
            aria-labelledby="password-length-slider"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={4}
            max={64}
          />
           <Typography align="center">{length}</Typography>
        </FormControl>

        <FormControl component="fieldset" variant="standard">
            <FormLabel component="legend">Character Types</FormLabel>
            <FormGroup row>
                <FormControlLabel
                    control={<Checkbox checked={options.uppercase} onChange={handleOptionChange} name="uppercase" />}
                    label="Uppercase (A-Z)"
                />
                <FormControlLabel
                    control={<Checkbox checked={options.lowercase} onChange={handleOptionChange} name="lowercase" />}
                    label="Lowercase (a-z)"
                />
                <FormControlLabel
                    control={<Checkbox checked={options.numbers} onChange={handleOptionChange} name="numbers" />}
                    label="Numbers (0-9)"
                />
                <FormControlLabel
                    control={<Checkbox checked={options.symbols} onChange={handleOptionChange} name="symbols" />}
                    label="Symbols (!@#$...)"
                />
            </FormGroup>
        </FormControl>

        <Button variant="contained" onClick={generatePassword}>
          Generate New Password
        </Button>
      </Box>
    </ToolPageLayout>
  );
};

export default PasswordGenerator;

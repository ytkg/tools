import React, { useState, useEffect, useCallback } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Slider,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import ToolPageLayout from '../components/ToolPageLayout';

const charsets = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-=',
};

const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState<number>(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    const activeOptions = Object.keys(options).filter(key => options[key as keyof typeof options]);

    if (activeOptions.length === 0) {
      setPassword('');
      return;
    }

    let guaranteedChars = '';
    activeOptions.forEach(option => {
      const currentCharset = charsets[option as keyof typeof charsets];
      guaranteedChars += currentCharset.charAt(Math.floor(Math.random() * currentCharset.length));
    });

    const fullCharset = activeOptions.map(opt => charsets[opt as keyof typeof charsets]).join('');

    let randomChars = '';
    for (let i = guaranteedChars.length; i < length; i++) {
      randomChars += fullCharset.charAt(Math.floor(Math.random() * fullCharset.length));
    }

    let newPassword = guaranteedChars + randomChars;
    newPassword = newPassword.split('').sort(() => 0.5 - Math.random()).join('');

    setPassword(newPassword);
    setCopied(false);
  }, [length, options]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOptions({
      ...options,
      [event.target.name]: event.target.checked,
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <ToolPageLayout
      title="Password Generator"
      description="Generate strong, random passwords."
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          value={password}
          InputProps={{ readOnly: true }}
          variant="outlined"
          fullWidth
        />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="contained" onClick={generatePassword}>
            Generate New Password
          </Button>
          <Button variant="outlined" onClick={handleCopy}>
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </Button>
        </Box>
        <Box>
          <Typography id="password-length-slider" gutterBottom>Password Length: {length}</Typography>
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
        </Box>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={options.uppercase} onChange={handleOptionChange} name="uppercase" />}
            label="Include Uppercase Letters"
          />
          <FormControlLabel
            control={<Checkbox checked={options.lowercase} onChange={handleOptionChange} name="lowercase" />}
            label="Include Lowercase Letters"
          />
          <FormControlLabel
            control={<Checkbox checked={options.numbers} onChange={handleOptionChange} name="numbers" />}
            label="Include Numbers"
          />
          <FormControlLabel
            control={<Checkbox checked={options.symbols} onChange={handleOptionChange} name="symbols" />}
            label="Include Symbols"
          />
        </FormGroup>
      </Box>
    </ToolPageLayout>
  );
};

export default PasswordGenerator;

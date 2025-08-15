import React, { useState, useMemo } from 'react';
import { TextField, Typography, Paper, Box, Button } from '@mui/material';

const CaseConverter: React.FC = () => {
  const [text, setText] = useState('');

  const convertedCases = useMemo(() => {
    if (!text) {
      return {
        upper: '',
        lower: '',
        camel: '',
        pascal: '',
        snake: '',
        kebab: '',
      };
    }

    const words = text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g) || [];
    const lowerWords = words.map(word => word.toLowerCase());

    const toPascalCase = () => lowerWords.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
    const pascal = toPascalCase();

    return {
      upper: text.toUpperCase(),
      lower: text.toLowerCase(),
      camel: pascal.charAt(0).toLowerCase() + pascal.slice(1),
      pascal: pascal,
      snake: lowerWords.join('_'),
      kebab: lowerWords.join('-'),
    };
  }, [text]);

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  const renderOutput = (title: string, value: string) => (
    <Paper variant="outlined" sx={{ p: 2, position: 'relative', overflow: 'hidden' }}>
      <Typography variant="subtitle2" color="text.secondary">{title}</Typography>
      <Typography
        variant="body1"
        sx={{
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
          fontFamily: 'monospace',
          mt: 1,
          mb: 4
        }}
      >
        {value || '...'}
      </Typography>
      <Button
        size="small"
        onClick={() => handleCopy(value)}
        disabled={!value}
        sx={{ position: 'absolute', bottom: 8, right: 8 }}
      >
        Copy
      </Button>
    </Paper>
  );

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Case Converter
      </Typography>
      <TextField
        label="Enter your text here"
        multiline
        rows={8}
        value={text}
        onChange={(e) => setText(e.target.value)}
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
        {renderOutput('UPPER CASE', convertedCases.upper)}
        {renderOutput('lower case', convertedCases.lower)}
        {renderOutput('camelCase', convertedCases.camel)}
        {renderOutput('PascalCase', convertedCases.pascal)}
        {renderOutput('snake_case', convertedCases.snake)}
        {renderOutput('kebab-case', convertedCases.kebab)}
      </Box>
    </Paper>
  );
};

export default CaseConverter;

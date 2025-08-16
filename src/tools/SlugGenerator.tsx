import React, { useState, useMemo } from 'react';
import { TextField, Paper, Typography, Button } from '@mui/material';
import slugify from 'slugify';
import ToolPageLayout from '../components/ToolPageLayout';

const SlugGenerator: React.FC = () => {
  const [inputText, setInputText] = useState('');

  const generatedSlug = useMemo(() => {
    if (!inputText) return '';
    return slugify(inputText, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g
    });
  }, [inputText]);

  return (
    <ToolPageLayout
      title="Slug Generator"
      description="Convert text into a URL-friendly slug."
    >
      <TextField
        label="Enter your text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
      />
      <Paper sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
        <Typography variant="h6" component="p" sx={{ wordBreak: 'break-all' }}>
          {generatedSlug || 'your-slug-will-appear-here'}
        </Typography>
      </Paper>
      <Button
        variant="outlined"
        onClick={() => navigator.clipboard.writeText(generatedSlug)}
        disabled={!generatedSlug}
        sx={{ mt: 2 }}
      >
        Copy Slug
      </Button>
    </ToolPageLayout>
  );
};

export default SlugGenerator;

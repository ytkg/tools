import React, { useState, useMemo } from 'react';
import PageMeta from '../components/PageMeta';
import { TextField, Typography, Paper, Box } from '@mui/material';

const CharacterCounter: React.FC = () => {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const charactersWithSpaces = text.length;
    const charactersWithoutSpaces = text.replace(/\s/g, '').length;
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const lines = text.split('\n').filter(Boolean).length;
    return { charactersWithSpaces, charactersWithoutSpaces, words, lines };
  }, [text]);

  return (
    <Paper sx={{ p: 2 }}>
      <PageMeta title="Character Counter" description="Count characters, words, and lines in text." />
      <Typography variant="h4" component="h1" gutterBottom>
        Character Counter
      </Typography>
      <TextField
        label="Enter your text here"
        multiline
        rows={10}
        value={text}
        onChange={(e) => setText(e.target.value)}
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Paper sx={{ p: 2, textAlign: 'center', flexGrow: 1 }}>
          <Typography variant="h6">{stats.charactersWithSpaces}</Typography>
          <Typography variant="body2">Characters (with spaces)</Typography>
        </Paper>
        <Paper sx={{ p: 2, textAlign: 'center', flexGrow: 1 }}>
          <Typography variant="h6">{stats.charactersWithoutSpaces}</Typography>
          <Typography variant="body2">Characters (no spaces)</Typography>
        </Paper>
        <Paper sx={{ p: 2, textAlign: 'center', flexGrow: 1 }}>
          <Typography variant="h6">{stats.words}</Typography>
          <Typography variant="body2">Words</Typography>
        </Paper>
        <Paper sx={{ p: 2, textAlign: 'center', flexGrow: 1 }}>
          <Typography variant="h6">{stats.lines}</Typography>
          <Typography variant="body2">Lines</Typography>
        </Paper>
      </Box>
    </Paper>
  );
};

export default CharacterCounter;

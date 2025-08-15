import React, { useState, useMemo } from 'react';
import { TextField, Typography, Paper, Grid } from '@mui/material';

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
      <Grid container spacing={2}>
        <Grid xs={6} sm={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">{stats.charactersWithSpaces}</Typography>
            <Typography variant="body2">Characters (with spaces)</Typography>
          </Paper>
        </Grid>
        <Grid xs={6} sm={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">{stats.charactersWithoutSpaces}</Typography>
            <Typography variant="body2">Characters (no spaces)</Typography>
          </Paper>
        </Grid>
        <Grid xs={6} sm={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">{stats.words}</Typography>
            <Typography variant="body2">Words</Typography>
          </Paper>
        </Grid>
        <Grid xs={6} sm={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">{stats.lines}</Typography>
            <Typography variant="body2">Lines</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CharacterCounter;

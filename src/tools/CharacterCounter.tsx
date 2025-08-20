import React, { useState, useMemo } from 'react';
import { TextField, Typography, Paper, Box } from '@mui/material';
import ToolPageLayout from '../components/ToolPageLayout';
import { useTranslation } from 'react-i18next';

const CharacterCounter: React.FC = () => {
  const { t } = useTranslation();
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const charactersWithSpaces = text.length;
    const charactersWithoutSpaces = text.replace(/\s/g, '').length;
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const lines = text.split('\n').filter(Boolean).length;
    return { charactersWithSpaces, charactersWithoutSpaces, words, lines };
  }, [text]);

  return (
    <ToolPageLayout
      title={t('tools.character-counter.name')}
      description={t('tools.character-counter.description')}
    >
      <TextField
        label={t('tools.character-counter.label')}
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
          <Typography variant="body2">{t('tools.character-counter.characters_with_spaces')}</Typography>
        </Paper>
        <Paper sx={{ p: 2, textAlign: 'center', flexGrow: 1 }}>
          <Typography variant="h6">{stats.charactersWithoutSpaces}</Typography>
          <Typography variant="body2">{t('tools.character-counter.characters_no_spaces')}</Typography>
        </Paper>
        <Paper sx={{ p: 2, textAlign: 'center', flexGrow: 1 }}>
          <Typography variant="h6">{stats.words}</Typography>
          <Typography variant="body2">{t('tools.character-counter.words')}</Typography>
        </Paper>
        <Paper sx={{ p: 2, textAlign: 'center', flexGrow: 1 }}>
          <Typography variant="h6">{stats.lines}</Typography>
          <Typography variant="body2">{t('tools.character-counter.lines')}</Typography>
        </Paper>
      </Box>
    </ToolPageLayout>
  );
};

export default CharacterCounter;

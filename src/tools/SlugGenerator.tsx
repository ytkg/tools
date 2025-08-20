import React, { useState, useMemo } from 'react';
import { TextField, Paper, Typography, Button } from '@mui/material';
import slugify from 'slugify';
import ToolPageLayout from '../components/ToolPageLayout';
import { useTranslation } from 'react-i18next';

const SlugGenerator: React.FC = () => {
  const { t } = useTranslation();
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
      title={t('tools.slug-generator.name')}
      description={t('tools.slug-generator.description')}
    >
      <TextField
        label={t('tools.slug-generator.input_label')}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
      />
      <Paper sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
        <Typography variant="h6" component="p" sx={{ wordBreak: 'break-all' }}>
          {generatedSlug || t('tools.slug-generator.placeholder')}
        </Typography>
      </Paper>
      <Button
        variant="outlined"
        onClick={() => navigator.clipboard.writeText(generatedSlug)}
        disabled={!generatedSlug}
        sx={{ mt: 2 }}
      >
        {t('tools.slug-generator.copy_button')}
      </Button>
    </ToolPageLayout>
  );
};

export default SlugGenerator;

import React, { useState } from 'react';
import { TextField, Paper, Box } from '@mui/material';
import { marked } from 'marked';
import ToolPageLayout from '../components/ToolPageLayout';
import { useTranslation } from 'react-i18next';

// Basic sanitization options
marked.setOptions({
  gfm: true,
  breaks: true,
});

const MarkdownPreviewer: React.FC = () => {
  const { t } = useTranslation();
  const initialMarkdown = t('tools.markdown-previewer.initial_markdown');
  const [markdown, setMarkdown] = useState<string>(initialMarkdown);

  const getMarkdownText = () => {
    const rawMarkup = marked(markdown);
    return { __html: rawMarkup };
  };

  return (
    <ToolPageLayout
      title={t('tools.markdown-previewer.name')}
      description={t('tools.markdown-previewer.description')}
    >
      <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ width: { xs: '100%', md: '50%' } }}>
          <TextField
            label={t('tools.markdown-previewer.input_label')}
            multiline
            rows={25}
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            variant="outlined"
            fullWidth
          />
        </Box>
        <Box sx={{ width: { xs: '100%', md: '50%' } }}>
          <Paper
            sx={{ p: 2, height: '100%', overflowY: 'auto' }}
            dangerouslySetInnerHTML={getMarkdownText()}
          />
        </Box>
      </Box>
    </ToolPageLayout>
  );
};

export default MarkdownPreviewer;

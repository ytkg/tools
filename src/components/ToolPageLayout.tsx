import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import PageMeta from './PageMeta';

interface ToolPageLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const ToolPageLayout: React.FC<ToolPageLayoutProps> = ({ title, description, children }) => {
  return (
    <Paper sx={{ p: 2 }}>
      <PageMeta title={title} description={description} />
      <Typography variant="h4" component="h1" gutterBottom>
        {title}
      </Typography>
      <Box
        sx={{
          // Apply styles to children elements to prevent overflow
          '& textarea': {
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all',
          },
          '& pre, & code': {
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all',
          },
          '& table': {
            display: 'block',
            overflowX: 'auto',
            maxWidth: '100%',
          },
        }}
      >
        {children}
      </Box>
    </Paper>
  );
};

export default ToolPageLayout;

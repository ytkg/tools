import React from 'react';
import { Paper, Typography } from '@mui/material';
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
      {children}
    </Paper>
  );
};

export default ToolPageLayout;

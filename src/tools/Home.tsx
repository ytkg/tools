import React, { useState, useMemo } from 'react';
import { toolList } from '../data/tools';
import { Card, CardActionArea, CardContent, Typography, Chip, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    toolList.forEach(tool => {
      tool.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  const filteredTools = useMemo(() => {
    if (!selectedTag) {
      return toolList;
    }
    return toolList.filter(tool => tool.tags.includes(selectedTag));
  }, [selectedTag]);

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Tools
      </Typography>
      <Box sx={{ mb: 4 }}>
        <Chip
          label="All"
          onClick={() => setSelectedTag(null)}
          variant={!selectedTag ? 'filled' : 'outlined'}
          sx={{ mr: 1, mb: 1 }}
        />
        {allTags.map(tag => (
          <Chip
            key={tag}
            label={tag}
            onClick={() => setSelectedTag(tag)}
            variant={selectedTag === tag ? 'filled' : 'outlined'}
            sx={{ mr: 1, mb: 1 }}
          />
        ))}
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {filteredTools.map(tool => (
          <Box key={tool.path} sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.33% - 16px)' } }}>
            <Card sx={{ height: '100%' }}>
              <CardActionArea component={Link} to={tool.path} sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <CardContent sx={{ flexGrow: 1, width: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                    {tool.icon}
                    <Typography variant="h6" component="div" sx={{ ml: 1.5 }}>
                      {tool.text}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                    {tool.description}
                  </Typography>
                </CardContent>
                 <Box sx={{ p: 2, pt: 0, alignSelf: 'flex-start' }}>
                    {tool.tags.map(tag => (
                        <Chip key={tag} label={tag} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                    ))}
                </Box>
              </CardActionArea>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Home;

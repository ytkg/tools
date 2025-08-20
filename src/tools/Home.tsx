import React, { useState, useMemo } from 'react';
import PageMeta from '../components/PageMeta';
import { toolList } from '../data/tools';
import { Card, CardActionArea, CardContent, Typography, Chip, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    toolList.forEach(tool => {
      tool.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  const translatedToolList = useMemo(() => {
    return toolList.map(tool => ({
      ...tool,
      text: t(`tools.${tool.path.substring(1)}.name`),
      description: t(`tools.${tool.path.substring(1)}.description`),
      tags: tool.tags.map(tag => t(`tags.${tag}`)),
    }));
  }, [t]);

  const filteredTools = useMemo(() => {
    if (!selectedTag) {
      return translatedToolList;
    }
    // Find original tools that have the selected tag
    const originalFiltered = toolList.filter(tool => tool.tags.includes(selectedTag));
    // Get their paths
    const filteredPaths = originalFiltered.map(tool => tool.path);
    // Return the translated tools that match the paths
    return translatedToolList.filter(tool => filteredPaths.includes(tool.path));
  }, [selectedTag, translatedToolList]);

  return (
    <Box>
      <PageMeta title="" description={t('home.meta_description')} />
      <Typography variant="h4" component="h1" gutterBottom>
        {t('home.title')}
      </Typography>
      <Box sx={{ mb: 4 }}>
        <Chip
          label={t('home.all_tags')}
          onClick={() => setSelectedTag(null)}
          variant={!selectedTag ? 'filled' : 'outlined'}
          sx={{ mr: 1, mb: 1 }}
        />
        {allTags.map(tag => (
          <Chip
            key={tag}
            label={t(`tags.${tag}`)}
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
                    {tool.tags.map((tag: string) => (
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

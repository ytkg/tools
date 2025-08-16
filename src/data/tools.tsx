import { tools } from '../tools';

export const toolList = tools.map(tool => ({
  text: tool.name,
  path: `/${tool.path}`,
  description: tool.description,
  tags: tool.tags,
  icon: tool.icon,
}));

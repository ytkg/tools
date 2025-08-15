import React, { useState } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { TextField, Paper, Typography, Box } from '@mui/material';
import { marked } from 'marked';

// Basic sanitization options
marked.setOptions({
  gfm: true,
  breaks: true,
});

const initialMarkdown = `# Welcome to my Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.
`;

const MarkdownPreviewer: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>(initialMarkdown);

  const getMarkdownText = () => {
    const rawMarkup = marked(markdown);
    return { __html: rawMarkup };
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Helmet>
        <title>Markdown Previewer | Developer Tools</title>
        <meta name="description" content="Edit and preview Markdown text in real-time." />
      </Helmet>
       <Typography variant="h4" component="h1" gutterBottom>
        Markdown Previewer
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ width: { xs: '100%', md: '50%' } }}>
          <TextField
            label="Markdown Input"
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
    </Paper>
  );
};

export default MarkdownPreviewer;

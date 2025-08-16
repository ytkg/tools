import React, { useState } from 'react';
import { TextField, Button, Box, Paper } from '@mui/material';
import ToolPageLayout from '../components/ToolPageLayout';

const TextSorter: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const getLines = (text: string) => text.split('\n');
  const setLines = (lines: string[]) => setOutputText(lines.join('\n'));

  const sortAsc = () => {
    setLines([...getLines(inputText)].sort((a, b) => a.localeCompare(b)));
  };

  const sortDesc = () => {
    setLines([...getLines(inputText)].sort((a, b) => b.localeCompare(a)));
  };

  const removeDuplicates = () => {
    setLines([...new Set(getLines(inputText))]);
  };

  const reverseLines = () => {
    setLines([...getLines(inputText)].reverse());
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
    setOutputText(event.target.value);
  }

  return (
    <ToolPageLayout
      title="Text Sorter & Deduplicator"
      description="Sort, reverse, and remove duplicate lines from text."
    >
      <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
        <TextField
          label="Input Text"
          multiline
          rows={15}
          value={inputText}
          onChange={handleInputChange}
          variant="outlined"
          fullWidth
          sx={{ flex: 1 }}
        />
        <TextField
          label="Output Text"
          multiline
          rows={15}
          value={outputText}
          variant="outlined"
          fullWidth
          InputProps={{
            readOnly: true,
          }}
          sx={{ flex: 1 }}
        />
      </Box>
      <Paper sx={{ p: 2, mt: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button variant="contained" onClick={sortAsc}>
            Sort A-Z
          </Button>
          <Button variant="contained" onClick={sortDesc}>
            Sort Z-A
          </Button>
          <Button variant="contained" onClick={removeDuplicates}>
            Remove Duplicates
          </Button>
          <Button variant="contained" onClick={reverseLines}>
            Reverse Lines
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigator.clipboard.writeText(outputText)}
            disabled={!outputText}
          >
            Copy Output
          </Button>
        </Box>
      </Paper>
    </ToolPageLayout>
  );
};

export default TextSorter;

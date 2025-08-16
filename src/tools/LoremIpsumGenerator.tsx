import React, { useState, useCallback } from 'react';
import {
  TextField,
  Button,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { loremIpsum } from 'lorem-ipsum';
import type { ILoremIpsumParams } from 'lorem-ipsum';
import ToolPageLayout from '../components/ToolPageLayout';

const LoremIpsumGenerator: React.FC = () => {
  const [count, setCount] = useState<number>(3);
  const [units, setUnits] = useState<'paragraphs' | 'sentences' | 'words'>(
    'paragraphs'
  );
  const [generatedText, setGeneratedText] = useState<string>('');

  const handleGenerate = useCallback(() => {
    const options: ILoremIpsumParams = {
      count,
      units,
    };
    setGeneratedText(loremIpsum(options));
  }, [count, units]);

  const handleUnitChange = (event: SelectChangeEvent<string>) => {
    setUnits(
      event.target.value as 'paragraphs' | 'sentences' | 'words'
    );
  };

  return (
    <ToolPageLayout
      title="Lorem Ipsum Generator"
      description="Generate dummy text for your designs."
    >
      <Paper sx={{ p: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          label="Count"
          type="number"
          value={count}
          onChange={(e) => setCount(Math.max(1, parseInt(e.target.value, 10)))}
          inputProps={{ min: 1 }}
          sx={{ width: 100 }}
        />
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel id="units-label">Units</InputLabel>
          <Select
            labelId="units-label"
            value={units}
            label="Units"
            onChange={handleUnitChange}
          >
            <MenuItem value="paragraphs">Paragraphs</MenuItem>
            <MenuItem value="sentences">Sentences</MenuItem>
            <MenuItem value="words">Words</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleGenerate}>
          Generate
        </Button>
      </Paper>
      <TextField
        label="Generated Text"
        multiline
        rows={15}
        value={generatedText}
        variant="outlined"
        fullWidth
        InputProps={{
          readOnly: true,
        }}
        sx={{ mt: 2 }}
      />
       <Button
          variant="outlined"
          onClick={() => navigator.clipboard.writeText(generatedText)}
          disabled={!generatedText}
          sx={{ mt: 1 }}
        >
          Copy to Clipboard
        </Button>
    </ToolPageLayout>
  );
};

export default LoremIpsumGenerator;

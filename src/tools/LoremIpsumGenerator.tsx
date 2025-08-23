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
import { useTranslation } from 'react-i18next';

const LoremIpsumGenerator: React.FC = () => {
  const { t } = useTranslation();
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
      title={t('tools.lorem-ipsum-generator.name')}
      description={t('tools.lorem-ipsum-generator.description')}
    >
      <Paper sx={{ p: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          label={t('tools.lorem-ipsum-generator.count_label')}
          type="number"
          value={count}
          onChange={(e) => setCount(Math.max(1, parseInt(e.target.value, 10)))}
          inputProps={{ min: 1 }}
          sx={{ width: 100 }}
        />
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel id="units-label">{t('tools.lorem-ipsum-generator.units_label')}</InputLabel>
          <Select
            labelId="units-label"
            value={units}
            label={t('tools.lorem-ipsum-generator.units_label')}
            onChange={handleUnitChange}
          >
            <MenuItem value="paragraphs">{t('tools.lorem-ipsum-generator.paragraphs_unit')}</MenuItem>
            <MenuItem value="sentences">{t('tools.lorem-ipsum-generator.sentences_unit')}</MenuItem>
            <MenuItem value="words">{t('tools.lorem-ipsum-generator.words_unit')}</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleGenerate}>
          {t('tools.lorem-ipsum-generator.generate_button')}
        </Button>
      </Paper>
      <TextField
        label={t('tools.lorem-ipsum-generator.generated_text_label')}
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
          {t('tools.lorem-ipsum-generator.copy_button')}
        </Button>
    </ToolPageLayout>
  );
};

export default LoremIpsumGenerator;

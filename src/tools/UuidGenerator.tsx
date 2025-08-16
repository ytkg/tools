import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  Tooltip,
} from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ToolPageLayout from '../components/ToolPageLayout';
import { v1 as uuidv1, v4 as uuidv4 } from 'uuid';

const UuidGenerator: React.FC = () => {
  const [generatedUuid, setGeneratedUuid] = useState('');
  const [uuidVersion, setUuidVersion] = useState<'v1' | 'v4'>('v4');
  const [copied, setCopied] = useState(false);

  const generateUuid = () => {
    const newUuid = uuidVersion === 'v4' ? uuidv4() : uuidv1();
    setGeneratedUuid(newUuid);
  };

  useEffect(() => {
    generateUuid();
  }, [uuidVersion]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedUuid);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <ToolPageLayout
      title="UUID/GUID Generator"
      description="Generate version 1 (timestamp-based) or version 4 (random) UUIDs."
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <FormControl component="fieldset">
          <FormLabel component="legend">UUID Version</FormLabel>
          <RadioGroup
            row
            aria-label="uuid-version"
            name="uuid-version"
            value={uuidVersion}
            onChange={(e) => setUuidVersion(e.target.value as 'v1' | 'v4')}
          >
            <FormControlLabel value="v1" control={<Radio />} label="Version 1" />
            <FormControlLabel value="v4" control={<Radio />} label="Version 4" />
          </RadioGroup>
        </FormControl>

        <TextField
          label="Generated UUID"
          value={generatedUuid}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <Tooltip title={copied ? 'Copied!' : 'Copy to Clipboard'}>
                <IconButton onClick={handleCopy}>
                  <FileCopyIcon />
                </IconButton>
              </Tooltip>
            ),
          }}
          fullWidth
        />

        <Button variant="contained" onClick={generateUuid}>
          Generate New UUID
        </Button>
      </Box>
    </ToolPageLayout>
  );
};

export default UuidGenerator;

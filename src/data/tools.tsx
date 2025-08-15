import React from 'react';
import DataObjectIcon from '@mui/icons-material/DataObject';
import CodeIcon from '@mui/icons-material/Code';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import QrCodeIcon from '@mui/icons-material/QrCode';
import TimerIcon from '@mui/icons-material/Timer';
import LinkIcon from '@mui/icons-material/Link';
import PaletteIcon from '@mui/icons-material/Palette';
import ArticleIcon from '@mui/icons-material/Article';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import { toolList as toolsData } from './tools-list';

const icons: { [key: string]: React.ReactNode } = {
    '/json-formatter': <DataObjectIcon />,
    '/base64-converter': <CodeIcon />,
    '/character-counter': <TextFieldsIcon />,
    '/qr-code-generator': <QrCodeIcon />,
    '/unix-timestamp': <TimerIcon />,
    '/url-encoder-decoder': <LinkIcon />,
    '/color-converter': <PaletteIcon />,
    '/markdown-previewer': <ArticleIcon />,
    '/jwt-decoder': <VpnKeyIcon />,
    '/hash-generator': <FingerprintIcon />,
};

export const toolList = toolsData.map(tool => ({
    ...tool,
    icon: icons[tool.path],
}));

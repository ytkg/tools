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
import PublicIcon from '@mui/icons-material/Public';
import HttpIcon from '@mui/icons-material/Http';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import TagIcon from '@mui/icons-material/Tag';
import PasswordIcon from '@mui/icons-material/Password';
import ImageIcon from '@mui/icons-material/Image';
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
    '/time-zone-converter': <PublicIcon />,
    '/ip-address-viewer': <HttpIcon />,
    '/keyboard-event-viewer': <KeyboardIcon />,
    '/unit-converter': <SquareFootIcon />,
    '/uuid-generator': <TagIcon />,
    '/password-generator': <PasswordIcon />,
    '/image-to-base64': <ImageIcon />,
};

export const toolList = toolsData.map(tool => ({
    ...tool,
    icon: icons[tool.path],
}));

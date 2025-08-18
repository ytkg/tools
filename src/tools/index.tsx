import React from 'react';
import { toolsData } from './data';
import type { ToolData } from './data';

// Icons
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
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import TransformIcon from '@mui/icons-material/Transform';
import StraightenIcon from '@mui/icons-material/Straighten';
import CasinoIcon from '@mui/icons-material/Casino';
import PasswordIcon from '@mui/icons-material/Password';
import ImageIcon from '@mui/icons-material/Image';

// Tool Components
import JsonFormatter from './JsonFormatter';
import Base64Converter from './Base64Converter';
import CharacterCounter from './CharacterCounter';
import QrCodeGenerator from './QrCodeGenerator';
import UnixTimestampConverter from './UnixTimestampConverter';
import UrlEncoderDecoder from './UrlEncoderDecoder';
import ColorConverter from './ColorConverter';
import MarkdownPreviewer from './MarkdownPreviewer';
import JwtDecoder from './JwtDecoder';
import HashGenerator from './HashGenerator';
import TimeZoneConverter from './TimeZoneConverter';
import IpAddressViewer from './IpAddressViewer';
import KeyboardEventViewer from './KeyboardEventViewer';
import LoremIpsumGenerator from './LoremIpsumGenerator';
import TextSorter from './TextSorter';
import SlugGenerator from './SlugGenerator';
import UnitConverter from './UnitConverter';
import UuidGenerator from './UuidGenerator';
import PasswordGenerator from './PasswordGenerator';
import ImageToBase64Converter from './ImageToBase64Converter';

export interface Tool extends ToolData {
  icon: React.ReactNode;
  component: React.ComponentType;
}

const components: { [path: string]: React.ComponentType } = {
  'json-formatter': JsonFormatter,
  'base64-converter': Base64Converter,
  'character-counter': CharacterCounter,
  'qr-code-generator': QrCodeGenerator,
  'unix-timestamp': UnixTimestampConverter,
  'url-encoder-decoder': UrlEncoderDecoder,
  'color-converter': ColorConverter,
  'markdown-previewer': MarkdownPreviewer,
  'jwt-decoder': JwtDecoder,
  'hash-generator': HashGenerator,
  'time-zone-converter': TimeZoneConverter,
  'ip-address-viewer': IpAddressViewer,
  'keyboard-event-viewer': KeyboardEventViewer,
  'lorem-ipsum-generator': LoremIpsumGenerator,
  'text-sorter': TextSorter,
  'slug-generator': SlugGenerator,
  'unit-converter': UnitConverter,
  'uuid-generator': UuidGenerator,
  'password-generator': PasswordGenerator,
  'image-to-base64-converter': ImageToBase64Converter,
};

const icons: { [path:string]: React.ReactNode } = {
  'json-formatter': <DataObjectIcon />,
  'base64-converter': <CodeIcon />,
  'character-counter': <TextFieldsIcon />,
  'qr-code-generator': <QrCodeIcon />,
  'unix-timestamp': <TimerIcon />,
  'url-encoder-decoder': <LinkIcon />,
  'color-converter': <PaletteIcon />,
  'markdown-previewer': <ArticleIcon />,
  'jwt-decoder': <VpnKeyIcon />,
  'hash-generator': <FingerprintIcon />,
  'time-zone-converter': <PublicIcon />,
  'ip-address-viewer': <HttpIcon />,
  'keyboard-event-viewer': <KeyboardIcon />,
  'lorem-ipsum-generator': <FormatQuoteIcon />,
  'text-sorter': <SortByAlphaIcon />,
  'slug-generator': <TransformIcon />,
  'unit-converter': <StraightenIcon />,
  'uuid-generator': <CasinoIcon />,
  'password-generator': <PasswordIcon />,
  'image-to-base64-converter': <ImageIcon />,
};

export const tools: Tool[] = toolsData.map(tool => ({
  ...tool,
  icon: icons[tool.path],
  component: components[tool.path],
}));

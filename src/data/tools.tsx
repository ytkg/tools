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

export const toolList = [
    { text: 'JSON Formatter', path: '/json-formatter', icon: <DataObjectIcon />, description: 'Format and validate JSON documents.', tags: ['formatter', 'json'] },
    { text: 'Base64 Converter', path: '/base64-converter', icon: <CodeIcon />, description: 'Encode and decode Base64 strings.', tags: ['encoder', 'decoder', 'converter'] },
    { text: 'Character Counter', path: '/character-counter', icon: <TextFieldsIcon />, description: 'Count characters, words, and lines in text.', tags: ['counter', 'text'] },
    { text: 'Case Converter', path: '/case-converter', icon: <TextFieldsIcon />, description: 'Convert text between different casings (camel, snake, etc.).', tags: ['converter', 'text', 'case'] },
    { text: 'QR Code Generator', path: '/qr-code-generator', icon: <QrCodeIcon />, description: 'Generate QR codes from text or URLs.', tags: ['generator', 'image'] },
    { text: 'Unix Timestamp', path: '/unix-timestamp', icon: <TimerIcon />, description: 'Convert between Unix timestamps and human-readable dates.', tags: ['converter', 'time'] },
    { text: 'URL Encoder/Decoder', path: '/url-encoder-decoder', icon: <LinkIcon />, description: 'Encode and decode URL components.', tags: ['encoder', 'decoder', 'url'] },
    { text: 'Color Converter', path: '/color-converter', icon: <PaletteIcon />, description: 'Convert between HEX and RGB color codes.', tags: ['converter', 'color', 'css'] },
    { text: 'Markdown Previewer', path: '/markdown-previewer', icon: <ArticleIcon />, description: 'Edit and preview Markdown text in real-time.', tags: ['formatter', 'text', 'markdown'] },
    { text: 'JWT Decoder', path: '/jwt-decoder', icon: <VpnKeyIcon />, description: 'Decode JSON Web Tokens and view their contents.', tags: ['decoder', 'jwt', 'security'] },
    { text: 'Hash Generator', path: '/hash-generator', icon: <FingerprintIcon />, description: 'Generate various hash digests (SHA-1, SHA-256, etc.).', tags: ['generator', 'security', 'hash'] },
];

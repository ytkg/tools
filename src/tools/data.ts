export interface ToolData {
  path: string;
  name: string;
  description: string;
  tags: string[];
}

export const toolsData: ToolData[] = [
  {
    path: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format and validate JSON documents.',
    tags: ['formatter', 'json'],
  },
  {
    path: 'base64-converter',
    name: 'Base64 Converter',
    description: 'Encode and decode Base64 strings.',
    tags: ['encoder', 'decoder', 'converter'],
  },
  {
    path: 'character-counter',
    name: 'Character Counter',
    description: 'Count characters, words, and lines in text.',
    tags: ['counter', 'text'],
  },
  {
    path: 'qr-code-generator',
    name: 'QR Code Generator',
    description: 'Generate QR codes from text or URLs.',
    tags: ['generator', 'image'],
  },
  {
    path: 'unix-timestamp',
    name: 'Unix Timestamp',
    description: 'Convert between Unix timestamps and human-readable dates.',
    tags: ['converter', 'time'],
  },
  {
    path: 'url-encoder-decoder',
    name: 'URL Encoder/Decoder',
    description: 'Encode and decode URL components.',
    tags: ['encoder', 'decoder', 'url'],
  },
  {
    path: 'color-converter',
    name: 'Color Converter',
    description: 'Convert between HEX and RGB color codes.',
    tags: ['converter', 'color', 'css'],
  },
  {
    path: 'markdown-previewer',
    name: 'Markdown Previewer',
    description: 'Edit and preview Markdown text in real-time.',
    tags: ['formatter', 'text', 'markdown'],
  },
  {
    path: 'jwt-decoder',
    name: 'JWT Decoder',
    description: 'Decode JSON Web Tokens and view their contents.',
    tags: ['decoder', 'jwt', 'security'],
  },
  {
    path: 'hash-generator',
    name: 'Hash Generator',
    description: 'Generate various hash digests (SHA-1, SHA-256, etc.).',
    tags: ['generator', 'security', 'hash'],
  },
  {
    path: 'time-zone-converter',
    name: 'Time Zone Converter',
    description: 'Compare and check the time in multiple cities around the world.',
    tags: ['converter', 'time', 'timezone'],
  },
  {
    path: 'ip-address-viewer',
    name: 'IP Address Viewer',
    description: 'Display your public IP address and browser information.',
    tags: ['network', 'ip', 'info'],
  },
  {
    path: 'keyboard-event-viewer',
    name: 'Keyboard Event Viewer',
    description: 'Display information about pressed keyboard keys.',
    tags: ['keyboard', 'event', 'developer'],
  },
  {
    path: 'lorem-ipsum-generator',
    name: 'Lorem Ipsum Generator',
    description: 'Generate dummy text for your designs.',
    tags: ['generator', 'text', 'dummy'],
  },
  {
    path: 'text-sorter',
    name: 'Text Sorter',
    description: 'Sort, reverse, and remove duplicate lines from text.',
    tags: ['sorter', 'text', 'utils'],
  },
  {
    path: 'slug-generator',
    name: 'Slug Generator',
    description: 'Convert text into a URL-friendly slug.',
    tags: ['generator', 'text', 'url'],
  },
];

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './tools/Home';
import JsonFormatter from './tools/JsonFormatter';
import Base64Converter from './tools/Base64Converter';
import CharacterCounter from './tools/CharacterCounter';
import QrCodeGenerator from './tools/QrCodeGenerator';
import UnixTimestampConverter from './tools/UnixTimestampConverter';
import UrlEncoderDecoder from './tools/UrlEncoderDecoder';
import ColorConverter from './tools/ColorConverter';
import MarkdownPreviewer from './tools/MarkdownPreviewer';
import JwtDecoder from './tools/JwtDecoder';
import HashGenerator from './tools/HashGenerator';
import TimeZoneConverter from './tools/TimeZoneConverter';
import IpAddressViewer from './tools/IpAddressViewer';
import KeyboardEventViewer from './tools/KeyboardEventViewer';
import UnitConverter from './tools/UnitConverter';
import UuidGenerator from './tools/UuidGenerator';
import PasswordGenerator from './tools/PasswordGenerator';
import ImageToBase64 from './tools/ImageToBase64';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="json-formatter" element={<JsonFormatter />} />
            <Route path="base64-converter" element={<Base64Converter />} />
            <Route path="character-counter" element={<CharacterCounter />} />
            <Route path="qr-code-generator" element={<QrCodeGenerator />} />
            <Route path="unix-timestamp" element={<UnixTimestampConverter />} />
            <Route path="url-encoder-decoder" element={<UrlEncoderDecoder />} />
            <Route path="color-converter" element={<ColorConverter />} />
            <Route path="markdown-previewer" element={<MarkdownPreviewer />} />
            <Route path="jwt-decoder" element={<JwtDecoder />} />
            <Route path="hash-generator" element={<HashGenerator />} />
            <Route path="time-zone-converter" element={<TimeZoneConverter />} />
            <Route path="ip-address-viewer" element={<IpAddressViewer />} />
            <Route path="keyboard-event-viewer" element={<KeyboardEventViewer />} />
            <Route path="unit-converter" element={<UnitConverter />} />
            <Route path="uuid-generator" element={<UuidGenerator />} />
            <Route path="password-generator" element={<PasswordGenerator />} />
            <Route path="image-to-base64" element={<ImageToBase64 />} />
            {/* Redirect any other path to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

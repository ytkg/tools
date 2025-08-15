import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link, Outlet } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
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

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.divider}`,
}));

const Drawer = styled(MuiDrawer)(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
    },
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export const toolList = [
    { text: 'JSON Formatter', path: '/json-formatter', icon: <DataObjectIcon />, description: 'Format and validate JSON documents.', tags: ['formatter', 'json'] },
    { text: 'Base64 Converter', path: '/base64-converter', icon: <CodeIcon />, description: 'Encode and decode Base64 strings.', tags: ['encoder', 'decoder', 'converter'] },
    { text: 'Character Counter', path: '/character-counter', icon: <TextFieldsIcon />, description: 'Count characters, words, and lines in text.', tags: ['counter', 'text'] },
    { text: 'QR Code Generator', path: '/qr-code-generator', icon: <QrCodeIcon />, description: 'Generate QR codes from text or URLs.', tags: ['generator', 'image'] },
    { text: 'Unix Timestamp', path: '/unix-timestamp', icon: <TimerIcon />, description: 'Convert between Unix timestamps and human-readable dates.', tags: ['converter', 'time'] },
    { text: 'URL Encoder/Decoder', path: '/url-encoder-decoder', icon: <LinkIcon />, description: 'Encode and decode URL components.', tags: ['encoder', 'decoder', 'url'] },
    { text: 'Color Converter', path: '/color-converter', icon: <PaletteIcon />, description: 'Convert between HEX and RGB color codes.', tags: ['converter', 'color', 'css'] },
    { text: 'Markdown Previewer', path: '/markdown-previewer', icon: <ArticleIcon />, description: 'Edit and preview Markdown text in real-time.', tags: ['formatter', 'text', 'markdown'] },
    { text: 'JWT Decoder', path: '/jwt-decoder', icon: <VpnKeyIcon />, description: 'Decode JSON Web Tokens and view their contents.', tags: ['decoder', 'jwt', 'security'] },
    { text: 'Hash Generator', path: '/hash-generator', icon: <FingerprintIcon />, description: 'Generate various hash digests (SHA-1, SHA-256, etc.).', tags: ['generator', 'security', 'hash'] },
];

const navigationList = [
    { text: 'Home', path: '/', icon: <HomeIcon /> },
    ...toolList,
]

export default function PermanentDrawerLayout() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ ml: `${drawerWidth}px`, width: `calc(100% - ${drawerWidth}px)` }}>
                <Toolbar>
                    {/* The AppBar is now just a container for the top bar content, title is in the drawer */}
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent">
                <DrawerHeader>
                    <Typography variant="h6" noWrap component="div">
                        Developer Tools
                    </Typography>
                </DrawerHeader>
                <Divider />
                <List>
                    {navigationList.map((tool) => (
                        <ListItem key={tool.text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                component={Link}
                                to={tool.path}
                                sx={{ minHeight: 48, px: 2.5 }}
                            >
                                <ListItemIcon sx={{ minWidth: 0, mr: 3, justifyContent: 'center' }}>
                                    {tool.icon}
                                </ListItemIcon>
                                <ListItemText primary={tool.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar /> {/* This is to offset the content below the AppBar */}
                <Outlet />
            </Box>
        </Box>
    );
}

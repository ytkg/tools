import { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
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
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Select from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import HomeIcon from '@mui/icons-material/Home';
import { toolList } from '../data/tools';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar)(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.divider}`,
}));

const Drawer = styled(MuiDrawer)({
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const navigationList = (
  t: (key: string) => string,
  lang: string
) => [
  { text: t('layout.home'), path: `/${lang}`, icon: <HomeIcon /> },
  ...toolList.map(tool => ({
    ...tool,
    // tool.path already includes a leading slash
    path: `/${lang}${tool.path}`,
    text: t(`tools.${tool.path.substring(1)}.name`),
  })),
];

export default function ResponsiveLayout() {
    const theme = useTheme();
    const { i18n, t } = useTranslation();
    const { lang: langParam } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const currentLang = (langParam ?? i18n.language ?? 'ja').startsWith('en') ? 'en' : 'ja';

    // Sync i18n with URL param when it changes
    useEffect(() => {
        if (i18n.language !== currentLang) {
            i18n.changeLanguage(currentLang);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentLang]);

    const handleLanguageChange = (event: SelectChangeEvent) => {
        const newLang = (event.target.value as string).startsWith('en') ? 'en' : 'ja';
        // Replace the first segment in the path with the new language
        const segments = location.pathname.split('/');
        // ['', lang, ...rest]
        if (segments.length > 1) {
            segments[1] = newLang;
        }
        const newPath = segments.join('/') || `/${newLang}`;
        i18n.changeLanguage(newLang);
        navigate(newPath, { replace: true });
    };

    const drawerContent = (
        <div>
            <DrawerHeader>
                <Typography variant="h6" noWrap component="div">
                    {t('layout.title')}
                </Typography>
            </DrawerHeader>
            <Divider />
            <List>
                {navigationList(t, currentLang).map((tool) => (
                    <ListItem key={tool.text} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            component={Link}
                            to={tool.path}
                            sx={{ minHeight: 48, px: 2.5 }}
                            onClick={() => !isDesktop && handleDrawerToggle()}
                        >
                            <ListItemIcon sx={{ minWidth: 0, mr: 3, justifyContent: 'center' }}>
                                {tool.icon}
                            </ListItemIcon>
                            <ListItemText primary={tool.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'block', sm: 'none' } }}
                    >
                        {t('layout.title')}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <FormControl size="small" sx={{ m: 1, minWidth: 120 }}>
                        <Select
                            value={currentLang}
                            onChange={handleLanguageChange}
                        >
                            <MenuItem value={'en'}>English</MenuItem>
                            <MenuItem value={'ja'}>日本語</MenuItem>
                        </Select>
                    </FormControl>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={handleDrawerToggle}
                        sx={{ display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    anchor={isDesktop ? 'left' : 'right'}
                    variant={isDesktop ? 'permanent' : 'temporary'}
                    open={isDesktop ? true : mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawerContent}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
}

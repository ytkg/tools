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

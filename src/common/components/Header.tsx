import { AppBar, Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material';
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import ThemeModeSwitch from './ThemeModeSwitch';
import ThemeTypeSwitch from './ThemeTypeSwitch';
import { useTranslation } from "react-i18next";
import LanguageSwitch from './LanguageSwitch';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = ['Home', 'Products', 'Contact'];

export const Header = (props: Props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { t, i18n } = useTranslation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Link to="/">
      <Typography variant="h6" sx={{ my: 2 }}>
          { t('TITLE')}
        </Typography>
      </Link>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem color="primary" key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/" >
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >           { t('TITLE')}
          </Typography>
          </Link>
          <ThemeModeSwitch />
          <ThemeTypeSwitch />
          <LanguageSwitch />
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item, index) => (
              <Button key={item} sx={{ color: '#fff' }} component={Link} to={`/${ index === 0 ? '' : item}`}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          color="primary"
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
    </div>
  )
};


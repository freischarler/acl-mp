import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
//import '../styles/ResponsiveAppBar.css';

const pages = [
  { id: 1, name: 'Eventos', path: 'events' },

]
const settings = [
  { id: 1, name: 'Profile', path: 'profile'}, 
  { id: 2, name: 'Configuración', path: 'config'}, 
  { id: 3, name: 'Mis eventos', path: 'my-events'}, 
  { id: 4, name: 'Manage Event', path: 'manage-event'},
  { id: 5, name: 'Manage Team', path: 'manage-team'},
  { id: 6, name: 'Logout', path: 'logout'}, 
];

const useStyles = makeStyles({
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    //marginLeft: theme.spacing(20),
    "&:hover": {
      color: "grey",
      borderBottom: "1px solid white",
    },
  },
});

export const ResponsiveAppBar = (props) => {
  const { loggedIn, setLoggedIn } = props
  const classes = useStyles();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  //console.log(loggedIn)

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setLoggedIn(true);
    }
  }, [setLoggedIn]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);



  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  
  const handleLogout = () => {
    localStorage.removeItem('user')
    setLoggedIn(false)
    //handleCloseUserMenu();
    navigate('/login')
  };

  const handleMenuItem = (name) => {
    if (name === 'Logout') {
      handleLogout()
    } else {
      const setting = settings.find(setting => setting.name === name);
      if (setting) {
        handleCloseUserMenu();
        navigate(`/${setting.path}`);
      }
    }
  };


  const handleLogIn = () => {
    navigate("/login");
  };

  return (
    <AppBar position="fixed" sx={{ bgcolor: '#000000' }} className={`navbar ${showNavbar ? 'navbar-visible' : 'navbar-hidden'}`}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={handleHomeClick}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.id}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
              
              <Link to={`/${page.path.toLowerCase()}`} className={classes.link}>
               {page.name}
              </Link>

              {/*<Button  variant="contained" color="primary"
                component={Link}
                to={`/${page.toLowerCase()}`}
              >
                {page}
              </Button>*/
              }
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
          {loggedIn ? (
              <>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
             
              <MenuItem 
                key={setting.id} 
                onClick={() =>  handleMenuItem(setting.name) }
              >
              <Typography textAlign="center">{setting.name}</Typography>
            </MenuItem>

                /*
                <MenuItem key={setting.id} onClick={() => navigate(`/${setting.path}`)}>
                  <Link to={setting.path} className={classes.link}>
                    {setting.name}
                  </Link>
                </MenuItem>*/
              ))}
            </Menu>
            </>
            ) : (
              <Button color="inherit" onClick={handleLogIn}>
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

ResponsiveAppBar.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  setLoggedIn: PropTypes.func.isRequired,
};

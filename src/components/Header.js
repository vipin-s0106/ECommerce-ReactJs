import React, { Fragment, useState, useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import ShopIcon from '@material-ui/icons/Shop';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {
  BrowserRouter as Router,
  Link,
  Redirect
} from "react-router-dom";

import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [isLoggedOut,setIsLoggedOut] = useState(props.loggedOut)

  const history = useHistory();  

  useEffect(() =>{
    setIsLoggedOut(props.loggedOut)
  })

  const logout_user = () =>{
    setIsLoggedOut(true)
    localStorage.clear()
    props.setloggedOutFunc()
    history.push("/login");
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem><Link style={{textDecoration:'None',color:'black'}} to="/profile">Profile</Link></MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
        {
            !isLoggedOut ?
              <React.Fragment>
                <Link to="/orders" style={{color:'black',textDecoration:'None'}}>
                  <MenuItem>
                      <IconButton aria-label="show 4 new mails" color="inherit">
                      <Badge color="secondary">
                          <ShopIcon />
                      </Badge>
                      </IconButton>
                      <p>Orders</p>
                  </MenuItem>
                </Link>
                <MenuItem onClick={handleProfileMenuOpen}>
                    <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                    >
                    <AccountCircle />
                    </IconButton>
                    <p>Profile</p>
                </MenuItem>
                <Link to="/logout" style={{color:'black',textDecoration:'None'}}>
                  <MenuItem onClick={logout_user}>
                      <IconButton aria-label="show 11 new notifications" color="inherit">
                      <Badge color="secondary">
                          <PowerSettingsNewIcon />
                      </Badge>
                      </IconButton>
                      <p>Logout</p>
                  </MenuItem>
                </Link>
              </React.Fragment>
            :
              <React.Fragment>
                <Link to="/login" style={{color:'black',textDecoration:'None'}}>
                  <MenuItem>
                      <IconButton aria-label="show 11 new notifications" color="inherit">
                      <Badge color="secondary">
                          <LockOpenIcon />
                      </Badge>
                      </IconButton>
                      <p>Login</p>
                  </MenuItem>
                  </Link>
                <Link to="/signup" style={{color:'black',textDecoration:'None'}}>
                  <MenuItem>
                      <IconButton aria-label="show 11 new notifications" color="inherit">
                      <Badge color="secondary">
                          <PersonAddIcon />
                      </Badge>
                      </IconButton>
                      <p>SignUp</p>
                  </MenuItem>
                </Link>
              </React.Fragment>

        }
    </Menu>
  );

  return (
    <div className={classes.grow}>

      <AppBar position="static">
        <Toolbar>
          <Link to="/dashboard" style={{textDecoration:'None',color:'white'}}>
            <Typography className={classes.title} variant="h5" noWrap>
              ECommerce
            </Typography>
          </Link>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {
                !isLoggedOut ?
                <React.Fragment>
                    <Link to="/orders" style={{color:'white',margin:5}}>
                      <IconButton aria-label="show 4 new mails" color="inherit">
                          <Badge color="secondary">
                              <ShopIcon />
                          </Badge>
                      </IconButton>
                    </Link>
                
                    <IconButton
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                        style={{margin:5}}
                        >
                        <AccountCircle />
                    </IconButton>
                    <IconButton onClick={logout_user} aria-label="show 17 new notifications" color="inherit">
                        <Badge color="secondary">
                            <PowerSettingsNewIcon />
                        </Badge>
                    </IconButton>
                </React.Fragment>
                :
                <React.Fragment>
                    <Link to="/login" style={{textDecoration:'None'}}>
                      <IconButton
                          edge="end"
                          aria-label="signin"
                          aria-controls={menuId}
                          aria-haspopup="true"
                          color="inherit"
                          style={{fontSize:16, margin:5,color:'white'}}
                          >
                          <Badge color="secondary">
                            <LockOpenIcon ></LockOpenIcon>
                          </Badge>
                          Login
                      </IconButton>
                    </Link>
                    <Link to="/signup" style={{textDecoration:'None'}}>
                      <IconButton
                          edge="end"
                          aria-label="signup"
                          aria-controls={menuId}
                          aria-haspopup="true"
                          color="inherit"
                          style={{fontSize:16, margin:5,color:'white'}}
                          >
                          <Badge color="secondary">
                            <PersonAddIcon></PersonAddIcon>
                          </Badge>
                          SignUp
                      </IconButton>
                    </Link>
                    
                </React.Fragment>
            }
            </div>
            <div className={classes.sectionMobile}>
                <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
                >
                <MoreIcon />
                </IconButton>
            
            </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

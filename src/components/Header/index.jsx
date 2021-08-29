import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CodeIcon from '@material-ui/icons/Code';
import {Link, NavLink, useHistory} from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import {Badge, Box, IconButton, Menu, MenuItem} from "@material-ui/core";
import {AccountCircle, AddShoppingCartOutlined, Close} from "@material-ui/icons";
import Login from "../../features/Auth/components/Login";
import Register from "../../features/Auth/components/Register";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../features/Auth/userSlice";
import {cartItemsCountSelector} from "../../features/Cart/selectors";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    link: {
        textDecoration: 'none',
        color: '#fff'
    },
    closeButton: {
        position: 'absolute',
        top: theme.spacing(1),
        right: theme.spacing(1),
        color: theme.palette.grey[500],
        zIndex: 1
    }
}));

const MODE = {
    LOGIN: 'login',
    REGISTER: 'register'
};

export default function ButtonAppBar() {
    const dispatch = useDispatch();
    const cartCount = useSelector(cartItemsCountSelector);
    const history = useHistory();
    const loggedInUser = useSelector(state => state.user.current);
    const isLoggedIn = !!loggedInUser.id;
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState(MODE.LOGIN);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (e) => {
        if (e) {
            if (e._reactName === 'onMouseUp') {
                return setOpen(true);
            } else {
                return setOpen(false);
            }
        }

        return setOpen(false);
    };

    const handleUserClickOpen = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleUserClickClose = () => {
        setAnchorEl(null);
    }

    const handleLogoutClick = () => {
        dispatch(logout());
        handleUserClickClose();
    }

    const handleMiniCartClick = () => {
        history.push('/cart');
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <CodeIcon className={classes.menuButton}/>
                    <Typography variant="h6" className={classes.title}>
                        <Link className={classes.link} to={"/"}>EZ Shop</Link>
                    </Typography>
                    <NavLink className={classes.link} to={"/todos"}>
                        <Button color="inherit">Todos</Button>
                    </NavLink>
                    <NavLink className={classes.link} to={"/albums"}>
                        <Button color="inherit">Albums</Button>
                    </NavLink>
                    <NavLink className={classes.link} to={"/color-box"}>
                        <Button color="inherit">Color Box</Button>
                    </NavLink>
                    <NavLink className={classes.link} to={"/counter"}>
                        <Button color="inherit">Counter</Button>
                    </NavLink>
                    <NavLink className={classes.link} to={"/products"}>
                        <Button color="inherit">Products</Button>
                    </NavLink>
                    {isLoggedIn && (
                        <IconButton color="inherit" onClick={handleUserClickOpen}>
                            <AccountCircle/>
                        </IconButton>
                    )}
                    {!isLoggedIn && (
                        <Button color="inherit" onClick={handleClickOpen}>
                            Login
                        </Button>
                    )}
                    <IconButton color="inherit" onClick={handleMiniCartClick}>
                        <Badge badgeContent={cartCount} color="secondary">
                            <AddShoppingCartOutlined/>
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleUserClickClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                getContentAnchorEl={null}
            >
                <MenuItem onClick={handleUserClickClose}>Profile</MenuItem>
                <MenuItem onClick={handleUserClickClose}>My account</MenuItem>
                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
            </Menu>
            <Dialog
                disableEscapeKeyDown
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <IconButton className={classes.closeButton} onClick={handleClose}>
                    <Close/>
                </IconButton>
                <DialogContent>
                    {mode === MODE.REGISTER && (
                        <>
                            <Register closeDialog={handleClose}/>
                            <Box textAlign="center">
                                <Button onClick={() => setMode(MODE.LOGIN)}>
                                    Already have an account.Login here
                                </Button>
                            </Box>
                        </>
                    )}
                    {mode === MODE.LOGIN && (
                        <>
                            <Login closeDialog={handleClose}/>
                            <Box textAlign="center">
                                <Button onClick={() => setMode(MODE.REGISTER)}>
                                    Dont have an account. Register here
                                </Button>
                            </Box>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}

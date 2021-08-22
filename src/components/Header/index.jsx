import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CodeIcon from '@material-ui/icons/Code';
import {Link, NavLink} from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import {Box, IconButton} from "@material-ui/core";
import {Close} from "@material-ui/icons";
import Login from "../../features/Auth/components/Login";
import Register from "../../features/Auth/components/Register";

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
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState(MODE.LOGIN);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                    <Button color="inherit" onClick={handleClickOpen}>
                        {(mode === MODE.LOGIN) ? 'Login' : 'Register'}
                    </Button>
                </Toolbar>
            </AppBar>
            <Dialog
                disableBackdropClick
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

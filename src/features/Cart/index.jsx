import React from 'react';
import {Box, Container, Grid, Paper, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {cartItemsCountSelector, cartItemsSelector, cartTotalSelector} from "./selectors";
import CartListItem from "./components/CartListItem";
import {removeFromCart, setQuantity} from "./cartSlice";
import {formatPrice} from "../../units";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2)
    },
    top: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: "center",
    },
    topRight: {
        marginLeft: theme.spacing(1)
    },
    content: {
        padding: theme.spacing(2, 0)
    },
    contentLeft: {
        flex: '1 1 0',
        marginRight: theme.spacing(1)
    },
    contentRight: {
        width: '300px',
        marginLeft: theme.spacing(1)
    }
}));

CartFeature.propTypes = {};

function CartFeature() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const cartCount = useSelector(cartItemsCountSelector);
    const cartSubtotal = useSelector(cartTotalSelector);
    const cartItems = useSelector(cartItemsSelector);

    const handleOnChangeItems = (newValues) => {
        dispatch(setQuantity({
            id: newValues.id,
            quantity: newValues.quantity
        }));
    }

    const handleRemoveItem = (id) => {
        const action = removeFromCart(id);
        dispatch(action);
    }

    return (
        <Box className={classes.root}>
            <Container>
                <Grid container className={classes.top}>
                    <Grid item>
                        <Typography component="h1" variant="h3">Cart Page</Typography>
                    </Grid>
                    <Grid item className={classes.topRight}>
                        <Typography component="span">{`(${cartCount} items)`}</Typography>
                    </Grid>
                </Grid>
                <Grid container className={classes.content}>
                    <Grid item className={classes.contentLeft}>
                        <Paper elevation={0}>
                            <CartListItem cartItems={cartItems} onSubmit={handleOnChangeItems}
                                          onRemoveItem={handleRemoveItem}/>
                        </Paper>
                    </Grid>
                    <Grid item className={classes.contentRight}>
                        <Paper elevation={0}>
                            <Typography component="span">Subtotal: </Typography>
                            <Typography component="h3">{formatPrice(cartSubtotal)}</Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default CartFeature;
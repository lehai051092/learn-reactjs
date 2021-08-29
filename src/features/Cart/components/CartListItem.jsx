import React from 'react';
import PropTypes from 'prop-types';
import {Box} from "@material-ui/core";
import CartItem from "./Item/CartItem";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 0,
        margin: 0,
        listStyleType: 'none',

        '& > li': {
            width: '100%'
        }
    },
}));

CartListItem.propTypes = {
    cartItems: PropTypes.array,
    onSubmit: PropTypes.func,
    onRemoveItem: PropTypes.func,
};

function CartListItem({cartItems = {}, onSubmit = null, onRemoveItem = null}) {
    const classes = useStyles();
    const handleChange = (newQuantity) => {
        if (!onSubmit) return;
        onSubmit(newQuantity);
    }

    const handleRemoveItem = (id) => {
        if (!onRemoveItem) return;
        onRemoveItem(id);
    }

    return (
        <Box component="ul" className={classes.root}>
            {cartItems.map((item) => (
                <li key={item.id}>
                    <CartItem item={item} onSubmit={handleChange} onRemoveItem={handleRemoveItem}/>
                </li>
            ))}
        </Box>
    );
}

export default CartListItem;
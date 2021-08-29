import React from 'react';
import PropTypes from 'prop-types';
import {Box, Link, Typography} from "@material-ui/core";
import QuantityField from "../../../../components/form-controls/QuantityField";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {STATIC_HOST, THUMBNAIL_PLACEHOLDER} from "../../../../constants";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    image: {
        width: '150px',
        height: '150px'
    },
}));

CartItem.propTypes = {
    item: PropTypes.object,
    onSubmit: PropTypes.func,
    onRemoveItem: PropTypes.func,
};

function CartItem({item = {}, onSubmit = null, onRemoveItem = null}) {
    const classes = useStyles();
    const {id, product, quantity} = item;
    const schema = yup.object().shape({
        quantity: yup.number().required('Please enter quantity!').min(1, 'Please enter smallest equal 1!').typeError('Please enter a number!')
    });
    const form = useForm({
        defaultValues: {
            quantity: quantity,
        },
        resolver: yupResolver(schema)
    });
    const thumbnailUrl = product.thumbnail
        ? STATIC_HOST + product.thumbnail?.url
        : THUMBNAIL_PLACEHOLDER;

    const handleSubmit = (quantity) => {
        if (!onSubmit) return;
        const values = {
            id,
            quantity
        };
        onSubmit(values);
    };

    const handleChange = (quantity) => {
        handleSubmit(quantity);
    }

    const handleRemoveItem = () => {
        if (!onRemoveItem) return;
        onRemoveItem(id);
    }

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)} className={classes.root}>
            <img src={thumbnailUrl} alt={product.name} className={classes.image}/>
            <Box>
                <Typography>{product.name}</Typography>
                <Link component="button" variant="body2" onClick={handleRemoveItem}>remove</Link>
            </Box>
            <Typography>{product.salePrice}</Typography>
            <Typography>{product.originalPrice}</Typography>
            <Typography>{product.promotionPercent}</Typography>
            <QuantityField form={form} name="quantity" onChangeRHF={handleChange}/>
        </form>
    );
}

export default CartItem;
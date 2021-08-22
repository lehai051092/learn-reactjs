import React from 'react';
import PropTypes from 'prop-types';
import {Box, Typography} from "@material-ui/core";
import {STATIC_HOST, THUMBNAIL_PLACEHOLDER} from "../../../constants/index";

Product.propTypes = {
    product: PropTypes.object,
};

function Product({product}) {
    const thumbnailUrl = product.thumbnail
        ? STATIC_HOST + product.thumbnail?.url
        : THUMBNAIL_PLACEHOLDER;
    return (
        <Box padding={1}>
            <Box padding={1}>
                <img src={thumbnailUrl} alt={product.name} width="100%"/>
            </Box>
            <Typography>{product.name}</Typography>
            <Typography>{product.originalPrice}</Typography>
        </Box>

    );
}

export default Product;
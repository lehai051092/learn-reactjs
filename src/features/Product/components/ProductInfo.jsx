import React from 'react';
import PropTypes from 'prop-types';
import {Box, Typography} from "@material-ui/core";
import formatPrice from "../../../units/comon";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        borderBottom: `1px solid ${theme.palette.grey[300]}`
    },
    shortDescription: {
        margin: theme.spacing(2, 0)
    },
    salePrice: {
        margin: theme.spacing(1, 0),
    },
    originalPrice: {
        marginRight: theme.spacing(1),
        textDecoration: "line-through"
    }
}));

ProductInfo.propTypes = {
    product: PropTypes.object,
};

function ProductInfo({product = {}}) {
    const classes = useStyles();
    const {name, shortDescription, salePrice, originalPrice, promotionPercent} = product;

    return (
        <Box className={classes.root}>
            <Typography component="h1" variant="h3">{name}</Typography>
            <Typography variant="body2" className={classes.shortDescription}>{shortDescription}</Typography>
            <Box>
                <Box component={"h3"} className={classes.salePrice}>{"Sale Price: " + formatPrice(salePrice)}</Box>
                {(promotionPercent > 0) && (
                    <>
                        <Box component={"span"} className={classes.originalPrice}>{"Original Price: " + formatPrice(originalPrice)}</Box>
                        <Box component={"span"}>{(promotionPercent > 0) && `-${promotionPercent}%`}</Box>
                    </>
                )}
            </Box>
        </Box>
    );
}

export default ProductInfo;
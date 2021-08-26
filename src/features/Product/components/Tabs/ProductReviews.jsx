import React from 'react';
import {Box, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    tabReviews: {
        padding: theme.spacing(1.5)
    }
}));

ProductReviews.propTypes = {};

function ProductReviews() {
    const classes = useStyles();

    return (
        <Box className={classes.tabReviews}>
            <Typography variant="body2">Reviews</Typography>
        </Box>
    );
}

export default ProductReviews;
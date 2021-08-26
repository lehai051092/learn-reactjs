import React from 'react';
import PropTypes from 'prop-types';
import {Box, Typography} from "@material-ui/core";
import DOMPurify from 'dompurify';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    tabDescription: {
        padding: theme.spacing(1.5)
    }
}));

ProductDescription.propTypes = {
    product: PropTypes.object,
};

function ProductDescription({product = {}}) {
    const classes = useStyles();
    const safeDescription = DOMPurify.sanitize(product.description);

    return (
        <Box className={classes.tabDescription}>
            <Typography variant={"body2"} dangerouslySetInnerHTML={{__html: safeDescription}}/>
        </Box>
    );
}

export default ProductDescription;
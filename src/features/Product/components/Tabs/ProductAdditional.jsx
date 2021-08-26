import React from 'react';
import {Box, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    tabAdditional: {
        padding: theme.spacing(1.5)
    }
}));

ProductAdditional.propTypes = {};

function ProductAdditional() {
    const classes = useStyles();

    return (
        <Box className={classes.tabAdditional}>
            <Typography variant="body2">Additional</Typography>
        </Box>
    );
}

export default ProductAdditional;
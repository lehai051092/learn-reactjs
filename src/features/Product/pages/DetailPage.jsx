import React from 'react';
import {Box, CircularProgress, Container, Grid, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ProductThumbnail from "../components/ProductThumbnail";
import {useRouteMatch} from "react-router-dom";
import useProductDetail from "../hooks/useProductDetail";
import ProductInfo from "../components/ProductInfo";

const useStyles = makeStyles(theme => ({
    root: {
        position: "relative"
    },
    left: {
        width: '400px',
        padding: theme.spacing(1.5)
    },
    right: {
        flex: '1 1 0',
        borderLeft: `1px solid ${theme.palette.grey[300]}`,
        padding: theme.spacing(1.5)
    },
    loading: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    }
}));

function DetailPage() {
    const classes = useStyles();
    const {params: {productId},} = useRouteMatch();
    const {product, loading} = useProductDetail(productId);

    return (
        <Box className={classes.root}>
            <Container>
                {(loading) && <CircularProgress color={"secondary"} className={classes.loading}/>}
                <Paper elevation={0}>
                    <Grid container>
                        <Grid item className={classes.left}>
                            <ProductThumbnail product={product}/>
                        </Grid>
                        <Grid item className={classes.right}>
                            <ProductInfo product={product}/>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
}

export default DetailPage;
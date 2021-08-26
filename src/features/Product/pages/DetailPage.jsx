import React from 'react';
import {Box, CircularProgress, Container, Grid, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ProductThumbnail from "../components/ProductThumbnail";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import useProductDetail from "../hooks/useProductDetail";
import ProductInfo from "../components/ProductInfo";
import AddToCartForm from "../components/AddToCartForm";
import ProductTabs from "../components/ProductTabs";
import ProductDescription from "../components/Tabs/ProductDescription";
import ProductAdditional from "../components/Tabs/ProductAdditional";
import ProductReviews from "../components/Tabs/ProductReviews";

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
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 5
    },
    productTabs: {
        borderTop: `1px solid ${theme.palette.grey[300]}`,
        borderBottom: `1px solid ${theme.palette.grey[300]}`
    }
}));

const handleAddToCartSubmit = (formValues) => {
    console.log(formValues);
}

function DetailPage() {
    const classes = useStyles();
    const {params: {productId}, url} = useRouteMatch();
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
                            <AddToCartForm onSubmit={handleAddToCartSubmit}/>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item>
                            <Box className={classes.productTabs}>
                                <ProductTabs/>
                            </Box>
                            <Switch>
                                <Route exact path={url}>
                                    <ProductDescription product={product}/>
                                </Route>
                                <Route exact path={`${url}/additional`} component={ProductAdditional}/>
                                <Route exact path={`${url}/reviews`} component={ProductReviews}/>
                            </Switch>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
}

export default DetailPage;
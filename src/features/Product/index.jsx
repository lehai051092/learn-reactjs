import React from 'react';
import {Route, Switch, useRouteMatch} from "react-router-dom";
import ListPage from "./pages/ListPage";
import {Box} from "@material-ui/core";
import DetailPage from "./pages/DetailPage";

ProductFeature.propTypes = {};

function ProductFeature(props) {
    const match = useRouteMatch();
    return (
        <Box paddingTop={4} paddingBottom={4}>
            <Switch>
                <Route path={match.url}  component={ListPage} exact/>
                <Route path={`${match.url}/:productId`}  component={DetailPage}/>
            </Switch>
        </Box>
    );
}

export default ProductFeature;
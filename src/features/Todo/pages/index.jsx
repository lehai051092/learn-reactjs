import React from 'react';
import {Route, Switch, useRouteMatch} from "react-router-dom";
import ListPage from "./ListPage";
import DetailPage from "./DetailPage";

TodoFeature.propTypes = {};

function TodoFeature(props) {
    const match = useRouteMatch(); // nested routing
    return (
        <div>
            <Switch>
                <Route path={match.path} component={ListPage} exact/>
                <Route path={`${match.path}/:todoId`} component={DetailPage}/>
            </Switch>
        </div>
    );
}

export default TodoFeature;
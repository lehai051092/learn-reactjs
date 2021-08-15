import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ListPage from './ListPage';
import DetailPage from './DetailPage';
import NotFound from '../../../components/NotFound';

TodoFeature.propTypes = {};

function TodoFeature(props) {
  const match = useRouteMatch(); // nested routing
  return (
    <div>
      <Switch>
        <Route path={match.path} component={ListPage} exact />
        <Route path={`${match.path}/:todoId`} component={DetailPage} exact />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default TodoFeature;

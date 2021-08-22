import AlbumFeature from './features/Album/pages';
import ColorBox from './components/ColorBox';
import Counter from './components/Counter';
import TodoFeature from './features/Todo';
import {Redirect, Route, Switch} from 'react-router-dom';
import NotFound from './components/NotFound';
import CounterFeature from "./features/Counter";
import Header from './components/Header';
import ProductFeature from "./features/Product";

function App() {
    return (
        <div className="App">
            <Header/>
            <Switch>
                <Redirect from="/home" to="/" exact/>
                <Redirect from="/post-list/:postId" to="/posts/:postId" exact/>

                <Route path="/" component={CounterFeature} exact/>
                <Route path="/todos" component={TodoFeature}/>
                <Route path="/albums" component={AlbumFeature}/>
                <Route path="/color-box" component={ColorBox}/>
                <Route path="/counter" component={Counter}/>
                <Route path="/products" component={ProductFeature}/>
                {/*Not Found*/}
                <Route component={NotFound}/>
            </Switch>
            Footer
        </div>
    );
}

export default App;

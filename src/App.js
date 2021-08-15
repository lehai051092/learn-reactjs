import './App.css';
import AlbumFeature from './features/Album/pages';
import ColorBox from './components/ColorBox';
import Counter from './components/Counter';
import TodoFeature from './features/Todo/pages';
import {NavLink, Route, Switch} from "react-router-dom";
import NotFound from "./components/NotFound";

function App() {
    return (
        <div className="App">
            Header
            {/*nav link*/}
            <p><NavLink to="/todos" activeClassName='active-menu'>Todos</NavLink></p>
            <p><NavLink to="/albums">Albums</NavLink></p>
            <p><NavLink to="/color-box">Color Box</NavLink></p>
            <p><NavLink to="/counter">Counter</NavLink></p>

            <Switch>
                <Route path="/todos" component={TodoFeature}/>
                <Route path="/albums" component={AlbumFeature}/>
                <Route path="/color-box" component={ColorBox}/>
                <Route path="/counter" component={Counter}/>
                {/*Not Found*/}
                <Route component={NotFound}/>
            </Switch>
            Footer
        </div>
    );
}

export default App;

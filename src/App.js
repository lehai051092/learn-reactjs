import './App.css';
import AlbumFeature from './features/Album/pages';
import ColorBox from './components/ColorBox';
import Counter from './components/Counter';
import TodoFeature from './features/Todo/pages';
import {Route} from "react-router-dom";

function App() {
    return (
        <div className="App">
            Header
            <Route path="/todos" component={TodoFeature}/>
            <Route path="/albums" component={AlbumFeature}/>
            <Route path="/color-box" component={ColorBox}/>
            <Route path="/counter" component={Counter}/>
            Footer
        </div>
    );
}

export default App;

import './App.css';
import AlbumFeature from './features/Album/pages';
import ColorBox from './components/ColorBox';
import Counter from './components/Counter';
import TodoFeature from './features/Todo/pages';

function App() {
  return (
    <div className="App">
      <TodoFeature />
      <ColorBox />
      <Counter />
      <AlbumFeature />
    </div>
  );
}

export default App;

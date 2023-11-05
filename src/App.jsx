import { Route, Routes } from 'react-router-dom';
import './App.css';
import IndexPage from './pages/IndexPage';
import Overlay from './Overlay';

function App() {
  return (
    <div>
      <Overlay/>
      <Routes>
        <Route index element={<IndexPage/>}/>
      </Routes>
    </div>
  );
}

export default App;

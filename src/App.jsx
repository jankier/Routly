import { Route, Routes } from 'react-router-dom';
import './App.css';
import IndexPage from './components/IndexPage';
import Overlay from './Overlay';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000';

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
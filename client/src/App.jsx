import { useState } from 'react';
import './App.css';
import IndexPage from './components/IndexPage/IndexPage.jsx';
import Overlay from './components/Overlay/Overlay.jsx';
import { UserContextProvider } from './UserContext.jsx';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {

  const [coordinates, setCoordinates] = useState({});

  return (
    <div className='main bg-white'>
      <UserContextProvider>
        <Overlay coordinates={coordinates}/>
        <IndexPage setCoordinates={setCoordinates}/>
      </UserContextProvider>
    </div>
  );
}

export default App;
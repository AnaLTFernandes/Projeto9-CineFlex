import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FilmsSecion from '../FilmsSection/FilmsSection';

import './reset.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>

      <header>
        CINEFLEX
      </header>

      <Routes>

        <Route path='/' element={<FilmsSecion />}/>
        <Route path='/filme/' element={<FilmsSecion />}/>

      </Routes>
      
    </BrowserRouter>
  );
}

export default App;

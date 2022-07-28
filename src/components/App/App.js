import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Films from '../Films/Films';
import Sessions from '../Sessions/Sessions';

import './reset.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>

      <header>
        CINEFLEX
      </header>

      <Routes>

        <Route path='/' element={<Films />}/>
        <Route path='/sessoes/:idFilme' element={<Sessions />}/>

      </Routes>
      
    </BrowserRouter>
  );
}

export default App;

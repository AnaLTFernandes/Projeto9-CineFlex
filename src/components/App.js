import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Header from './Header';
import Films from './Films';
import Sessions from './Sessions';
import Seats from './Seats';
import Success from './Success';

import GlobalStyles from './GlobalStyles';

function App() {
  const [home, setHome] = useState(true);

  return (
    <BrowserRouter>

      <GlobalStyles />
      <Header home={ home }/>

      <Routes>

        <Route path='/' element={ <Films setHome={setHome}/> } />
        <Route path='/sessoes/:idFilme' element={ <Sessions setHome={setHome}/> }/>
        <Route path='/assentos/:idSession' element={ <Seats /> }/>
        <Route path='/sucesso' element={ <Success setHome={setHome} /> }/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;
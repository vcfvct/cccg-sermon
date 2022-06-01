import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { HeaderComponent } from './header/header';
import { SermonDetailComponent } from './sermon-detail/SermonDetailComponent';
import { SermonList } from './sermon-list/SermonList';

function App() {
  return (
    <div className="App">
      <HeaderComponent />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SermonList />} />
          <Route path="/detail" element={<SermonDetailComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

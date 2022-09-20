import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.scss';

import Pages from 'pages';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Pages.Main />} />
        <Route path="/mb-saga" element={<Pages.MBSaga />} />
        <Route path="/rocketcher/:username" element={<Pages.Rocketcher />} />
      </Routes>
    </div>
  );
}

export default App;

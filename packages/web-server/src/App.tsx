import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.scss';

import Pages from 'pages';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<Pages.Main />} /> */}
        <Route path="/" element={<Pages.Bible />} />
        <Route path="/blog" element={<Pages.Blog />} />
        <Route path="/blog/translate" element={<Pages.Translate />} />
        <Route path="/blog/:id" element={<Pages.Blog />} />
        <Route path="/twitch" element={<Pages.Twitch />} />
        <Route path="/twitch/:id" element={<Pages.Twitch />} />
        <Route path="/mb-saga" element={<Pages.MBSaga />} />
        <Route path="/mb-saga/:id" element={<Pages.MBSaga />} />
        <Route path="/mb-saga/:paramNav/:paramId" element={<Pages.MBSaga />} />
        <Route path="/rocketcher/:username" element={<Pages.Rocketcher />} />
      </Routes>
    </div>
  );
}

export default App;

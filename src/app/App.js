import React from 'react';
import FetchHiring from './components/fetch-hiring/FetchHiring';
import './App.css';

function App() {
  return (
    <div className="o-app">
      <header className="o-app__header">HEADER</header>
      <main className="o-app__main">
        <FetchHiring />
      </main>
      <footer className="o-app__header">FOOTER</footer>
    </div>
  );
}

export default App;

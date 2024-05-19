// src/App.js
import React from 'react';
import NewsForm from './components/NewsForm';
import NewsList from './components/NewsList';

function App() {
  return (
    <div className="App">
      <h1>Add News</h1>
      <NewsForm />
      <NewsList />
    </div>
  );
}

export default App;

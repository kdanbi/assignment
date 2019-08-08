import React from 'react';
import './App.css';
import Todo from './components/todo'
import {BrowserRouter, Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>To-do List</h1>
        <Route path="/" exact component={Todo} />
      </div>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  // return <div>Hello, TrybeWallet!</div>;
  return (
    <Switch>
      <Route path="/" exact component={ Login } />
    </Switch>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CharacterList from './components/CharacterList';
import CharacterProfile from './components/CharacterProfile'
import 'bulma/css/bulma.min.css';




function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path='/' exact component={CharacterList} />
          <Route path='/profile/:id' exact component={CharacterProfile} />
        </Switch>
      </Router>
    </>
  );
}

export default App;

import React from 'react';
import './App.css';
import Pwgen from './components/pwgen';
import Chat from './components/chat/chat';
import Login from './components/login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends React.Component {
  render() {
    return(
      <Router>
        <div className='app'>
          <Switch>
            <Route path='/pwgen' component={Pwgen}/>
            <Route path='/' exact render={this.logout} component={Chat}/>
            <Route path='/login' component={Login}/>
          </Switch>
        </div>
     </Router>
    );
  }
}

export default App;

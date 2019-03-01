import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Create from './components/create.component';
import Edit from './components/edit.component';
import Index from './components/index.component';

const Navbar = (props) => {
  console.log('props....', props)
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <Link to={'/'} className="navbar-brand">Welcome to Harbinger</Link>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
      <li className="nav-item">
          <Link to={'/'} className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to={'/create'} className="nav-link">Register</Link>
        </li>
        <li className="nav-item">
          <Link to={'/index'} className="nav-link">Login</Link>
        </li>
      </ul>
    </div>
    {
      props.location.pathname.includes('edit') &&
      <input type="button" value="Logout" className="btn btn-primary" onClick={handlelogout =>{localStorage.setItem('token', '');
                 props.history.push({
                    pathname: '/index/',
                  })}}/>
    }
  </nav>
  )
}

class App extends Component { 
  render() {
    return (
      <Router>
        <div className="container">      
          <Route path="/" component={Navbar}></Route>
          <br/>
          <h2>Welcome to React CRUD Tutorial</h2> <br/>

          <Switch>
              <Route exact path='/create' component={ Create } />
              <Route path='/edit/:id' component={ Edit } />
              <Route path='/index' component={ Index } />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
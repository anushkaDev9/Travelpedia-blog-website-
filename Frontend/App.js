import './App.css';
import Navigation from './shared/Pages/Navigation';
import Users from './Users/Pages/Users';
import AddPlace from './Places/Pages/AddPlace';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch,Route,Redirect} from 'react-router-dom';
import Places from './Places/Pages/Places';
import Auth from './Auth/Pages/Auth';
import { AuthContext } from './Auth/Components/AuthContext';
import React, { useState,useCallback } from 'react';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName,setUserName]=useState('')
  const login = useCallback((uid) => {
    setUserName(uid)
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setUserName(null)
    setIsLoggedIn(false);
  }, []);
 
 console.log(userName)
  let routes;
  if(isLoggedIn){
   
    routes=(
<React.Fragment>
<Switch>
      <Route path='/' exact ><Users/></Route>
<Route path='/add/places' exact><AddPlace/></Route>
<Route  path="/places/user/:userName" exact><Places/></Route>
<Redirect to='/'></Redirect>
      </Switch>
</React.Fragment>
    )
  }else{
   routes=(
    <React.Fragment>
<Switch>
      <Route path='/' exact ><Users/></Route>
<Route path='/auth' exact><Auth/></Route>
<Redirect to='/auth'></Redirect>
      </Switch>
</React.Fragment>
   )

  }
  return (
    <div className="App">
      <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn,userName:userName, login: login, logout: logout}}
    >
      <Router>
      <Navigation/>
      {routes}
      </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;

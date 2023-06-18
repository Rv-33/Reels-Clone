import logo from './logo.svg';
import './App.css';
import Signup from './Components/Signup';
import Login from './Components/Login';
import { AuthProvider } from './Context/Authcontext';
import { useContext } from 'react';
import Feed from './Components/Feed';
import { Switch } from '@mui/material';
import SignUp from './Components/Signup';
import Privateroute from './Components/Privateroute';
import Resetpwd from './Components/Resetpwd';
import Ioa from './Components/Ioa';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import PrivateRoute from './Components/Privateroute';
import Profile from './Components/Profile';
// import Resetpwd from './Components/Resetpwd';
function App() {
  return (
    <Router>
    {/* all the components in b.w the auth provider will be children */}
      <AuthProvider>
        <Routes>
        <Route path='/login' element={ <Login/>} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/reset' element={<Resetpwd/>}/>
          {/* <Route path="/" element={<PrivateRoute Component={Feed} />} /> */}
          {/* <Route path='/' element={Privateroute Component={<Feed/>}/>} */}
          {/* <Route  elemet={Privateroute} /> */}
          <Route
          path='/'
          element={
            <Privateroute>
              <Feed/>
            </Privateroute>
          }
          />
          <Route
            /*here id will be a variable and for any data the profile page will be show */
          path='/profile/:id'
          element={
            <Privateroute>
              <Profile/>
            </Privateroute>
          }
          />
         
        </Routes>
        
        
        </AuthProvider>
  </Router>
                //  <Ioa/>
  )
}

export default App;

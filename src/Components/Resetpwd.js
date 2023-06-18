import React from 'react'
import './Login.css'
import TextField from "@mui/material/TextField";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useState } from 'react';
import { AuthContext } from '../Context/Authcontext';
import { useContext } from 'react';
function Resetpwd() {
  const [email, setEmail] = useState('');
  const { reset } = useContext(AuthContext);
  const handleClick = () => {
    try {
           
    } catch (err) {
      
      }
  }
  return (
    <div>
      <h1>Input Your Email adress for password reset!</h1>
      <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size="small" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Button
              color="primary"
              fullWidth={true}
              variant="contained"
              margin="dense"
              onClick={handleClick}
            >
              Reset Passowrd
            </Button>
      {/* email */}
    </div>
  )
}

export default Resetpwd;

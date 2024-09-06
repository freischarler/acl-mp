import { Button, Container, TextField, Snackbar, Alert , Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { postLogin, getLoginUser } from '../services/api';


export const Login = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const checkAccountExists = (callback) => {
    /*/check .env (root) to see if the enviroment is production or development
    if(process.env.REACT_APP_NODE_ENV === 'production') {
      idx = 1
      callback(true)
      return
    }*/
    postLogin(email, password)
    .then(r => {
        if (r.status === 200) {
              getLoginUser(email, password).then(r => {
                console.log(r.data)
                localStorage.setItem("user", r.data.user_id);  
                callback(true)  ;
              }
            )
        } else { 
            callback(false);
        }
    })
    .catch(err => {
        console.log(err.message);
        setOpen(true); // Open the Snackbar when login fails
        setErrorMessage(err.message); // Set the error message
    })
}

  const handleLogin = (event) => {
    event.preventDefault(); // Add this line
    console.log(email)


    // Call the api to login

    // Perform login here
    // This is a simple check and should be replaced with actual authentication
    //if (email === 'admin' && password === 'admin') {
    //  localStorage.setItem('user', 'admin');
    checkAccountExists(accountExists => {
      // If yes, log in 
      if (accountExists){ 
        props.setLoggedIn(true)
        //console.log(navigate.length)
        if (navigate.length >= 2) {
          navigate(-1)
        } else {
          navigate('/dashboard');
        }
      } else {
      // Handle failed login
        console.error('Login failed');
      }
    })
  }


  return (
    <Container component="main" maxWidth="xs">
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert  onClose={handleClose} severity="error" elevation={6} variant="filled">
          {errorMessage}
        </Alert >
      </Snackbar>
      <Box 
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
            <Button
              type="submit" // Add this line
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={() => navigate('/signup')}
            >
              Register
            </Button>
        </Box>
      </Box>
    </Container>
  );
}


Login.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  setLoggedIn: PropTypes.func.isRequired,
};

import { useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { LinearProgress, InputAdornment, Grid, IconButton, Alert, Snackbar, Container, Typography, Box, TextField, CssBaseline, Button, Avatar, Stack } from '@mui/material'
import { Router, useRouter } from 'next/router'
import Link from 'next/link'


export default function SignIn() {
  const [state, setState] = useState({ success: null, message: null })
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setemailError] = useState(false)
  const [passwordError, setpasswordError] = useState(false)
  const router = useRouter()

  const signIn = async (email, password) => {
    try {
      Router.events.emit('loadStart')
      const res = await fetch('http://localhost:3000/api/signIn', {
        method: 'POST',
        body: JSON.stringify({ email: email, password: password })
      })
      Router.events.emit('loadEnd')
      let json = await res.json()
      if (res.ok) {
        setState({ success: true, message: "Signed in succesfully.Redirecting..." })
        setTimeout(() => router.replace('/'), 1500)
      }
      else {
        setState({ success: false, message: json.message })
      }
    } catch (error) {
      setState({ success: false, message: "Couldn\'t connect to server" })
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setemailError(false)
    setpasswordError(false)
    let email = data.get('email')
    let password = data.get('password')
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!reg.test(email)) {
      setemailError(true)
      return
    }
    if (!email) {
      setemailError(true)
      return
    }
    if (!password) {
      setpasswordError(true)
      return
    }
    signIn(email, password)
  };

  return (
    <Stack>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              error={emailError}
              helperText={emailError ? "Invalid Email" : ""}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              type={showPassword ? "text" : "password"}
              fullWidth
              error={passwordError}
              name="password"
              label="Password"
              helperText={passwordError ? "Password must not be blank" : ""}
              id="password"
              autoComplete="password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => { setShowPassword(!showPassword) }}
                    >
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Snackbar
        open={state.success != null}
        autoHideDuration={6000}
        onClose={() => { setState({}) }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => { setState({}) }}
          severity={state.success ? "success" : "error"}
          sx={{ width: '100%' }}
        >
          {state.message ? state.message : ""}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
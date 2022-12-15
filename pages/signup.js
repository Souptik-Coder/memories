import { useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Alert, Snackbar, Container, Typography, Box, TextField, CssBaseline, Button, Avatar, Stack } from '@mui/material'
import Link from 'next/link'
export default function SignUp() {
  const [state, setState] = useState({ success: null, message: null })
  const [emailError, setemailError] = useState(false)

  const getToken = async (email) => {
    try {
      const res = await fetch('http://localhost:3000/api/getToken', {
        method: 'POST',
        body: JSON.stringify({ email: email })
      })
      let json = await res.json()
      if (res.ok) {
        console.log(json)
        setState({ success: true, message: "Please check your email for further instructions" })
      }
      else {
        setState({ success: false, message: json.message })
      }
    } catch (error) {
      setState({ success: false, message: "Couldn\'t connect to server" })
    }

  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setemailError(false)
    const data = new FormData(event.currentTarget);
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!reg.test(data.get('email'))) {
      setemailError(true)
      return
    }
    getToken(data.get('email'))
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
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{
            mt: 3,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column'
          }}
          >

            <TextField
              error={emailError}
              required
              fullWidth
              id="email"
              label="Email Address"
              helperText={emailError ? "Invalid Email" : ""}
              name="email"
              autoComplete="off"
            />

            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Link href="/signin">
              Already have an account? Sign in
            </Link>
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
import { useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { InputAdornment,Grid, IconButton,Alert, Snackbar, Container, Typography, Box, TextField, CssBaseline, Button, Avatar, Stack } from '@mui/material'
import { useRouter } from 'next/router'

export default function SignUp() {
    const router = useRouter()
    const [state, setState] = useState({ success: null, message: null })
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);
    const [nameError, setnameError] = useState(false)
    const [passwordError, setpasswordError] = useState(false)
    const [cpasswordError, setcpasswordError] = useState(false)

    const createAccount = async(name, password) => {
        try {
            console.log(router.query.token)
            const res = await fetch('http://localhost:3000/api/createAccount', {
                method: 'POST',
                body: JSON.stringify({ username: name, password: password, token: router.query.token })
            })
            let json = await res.json()
            if (res.ok) {
                setState({ success: true, message: "Account created succesfully" })
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
        setnameError(false)
        setpasswordError(false)
        setcpasswordError(false)

        let name = data.get('name')
        let password = data.get('password')
        let cpassword = data.get('confirmPassword')

        if (!name) {
            setnameError(true)
            return
        }
        if (!password) {
            setpasswordError(true)
            return
        }
        if (!cpassword || password != cpassword) {
            setcpasswordError(true)
            return
        }

        createAccount(name, password)

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
                        Create Account
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    error={nameError}
                                    autoComplete="off"
                                    name="name"
                                    required
                                    helperText={nameError ? "Name should not be blank" : ""}
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={passwordError}
                                    required
                                    helperText={passwordError ? "Password must be atleast 8 characters" : ""}
                                    fullWidth
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    label="Password"
                                    name="password"
                                    autoComplete="off"
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
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={cpasswordError}
                                    required
                                    fullWidth
                                    helperText={cpasswordError ? "Confirm password doesn't match with password" : ""}
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type={showCPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    autoComplete="off"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => { setShowCPassword(!showCPassword) }}
                                                >
                                                    {showCPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="outlined"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Create Account
                        </Button>
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
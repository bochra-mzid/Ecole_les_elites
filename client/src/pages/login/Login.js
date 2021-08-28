import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import "./login.css"

import { useHistory } from 'react-router-dom'

const Axios = require('axios')

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '60%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn(props) {
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [message, setMessage] = useState("")

    let history = useHistory()
    const isAuthen = (e) => {
        e.preventDefault();
        Axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:4000/checkToken",
            headers: {
                'Content-Type': "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        }).then(res => {
            if (res.status === 200) {
                localStorage.setItem("loggedIn", "true")
                if (props.id == "administrateur") {
                    history.push("/admin")
                }
                else if (props.id == "enseignant") {
                    history.push('/enseignant')
                }
            }
        })
    }
    var url
    if (props.id == "administrateur") { url = "http://localhost:4000/loginAdm" }
    else if (props.id == "enseignant") { url = "http://localhost:4000/loginEns" }
    const login = (e) => {
        Axios({
            method: "POST",
            data: {
                email: loginEmail,
                password: loginPassword,
            },
            withCredentials: true,
            url: url,
        }).then((response) => {
            if (response.data.auth) {
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("ID", response.data.id)
                isAuthen(e)
                setMessage('')

            }
            else {
                console.log(response.data)
                setMessage(response.data.message)
            }
        }
        )
    };

    const classes = useStyles();
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    console.log(props.id)

    return (
        <Container component="main" maxWidth="s">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h3">
                    دخول
                </Typography>
                <form className={classes.form} noValidate 
                >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="البريد الإلكتروني"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={loginEmail}
                        onChange={(e) => { setLoginEmail(e.target.value) }}

                    />
                    <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined" fullWidth required>
                        <InputLabel htmlFor="outlined-adornment-password"
                        >كلمة السر</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={loginPassword}
                            onChange={(e) => { setLoginPassword(e.target.value) }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={70}
                        />
                    </FormControl>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={login}
                        className="but"
                        
                    >
                        دخول
                    </Button>
                    <div className="message">{message}</div>
                </form>
            </div>
        </Container>
    );
}
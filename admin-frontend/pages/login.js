import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { userService } from '../services/user.service';
import { useRouter } from 'next/router';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage:
      'url(https://4.bp.blogspot.com/-L_mK1Ln1Hgg/V5rrZ8dDn5I/AAAAAAAAD-E/5x4sAVLzh6I7nguSwRO1L1VWqUIsv9gIgCLcB/s640/writing-blog-blonde.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  let state = {
    username: '',
    password: '',
    submitted: false,
    error: '',
  };

  const [user, setUser] = useState({});
  const http = 'http://localhost:3001';
  // useEffect(() => {
  //   fetch(http + '/users')
  //     .then(response => response.json())
  //     .then(({ data, length }) => {
  //       console.log(data);
  //       setUser(data);
  //     });
  // }, []);
  // let login = event => {
  //   console.log('Hola');
  // };
  const router = useRouter();
  function handleChange(e) {
    const { name, value } = e.target;
    if (name === 'email') {
      state.email = e.target.value;
    } else {
      state.password = e.target.value;
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    const { email, password, returnUrl } = state;

    // stop here if form is invalid
    if (!(email && password)) {
      return;
    }
    userService.login(email, password).then(
      user => {
        router.push('/');
        console.log('entro ' + user);
      },
      error => console.log(error)
    );
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            GuaoBlogs
          </Typography>
          <Typography component="h1" variant="h5">
            Ingresar
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo electronico"
              onChange={handleChange}
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              onChange={handleChange}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordarme"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Ingresar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Olvidaste tu contraseña?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {'No tienes una cuenta? Registrarme.'}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

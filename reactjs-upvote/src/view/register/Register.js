import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  makeStyles,
  Container,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useForm, Controller } from "react-hook-form";
import AuthContext from "../../context/auth";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  let history = useHistory();
  const { user, registerUser } = useContext(AuthContext);
  const [customSnackbar, setCustomSnackbar] = useState({
    open: false,
    message: "",
    type: "error",
  });
  const { register, handleSubmit } = useForm();

  async function onSubmit(data) {
    console.log(data);
    let response = await registerUser(data);
    if (response.error) {

      setCustomSnackbar({
        open: true,
        message: response.error,
        type: "error",
      });
      return;
    }
    setCustomSnackbar({
      open: true,
      message: "Vamos Lá!",
      type: "success",
    });
  }
  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setCustomSnackbar({
      open: false,
      message: "",
      type: "success",
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
        Cadastrar-se
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            inputRef={register({ required: true })}
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={register}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Registrar
          </Button>
          <Grid container justify="flex-end">
            <Grid>
              <Link href="" onClick={()=>history.push('/')}>
                {"Já tenho conta!"}
              </Link>
            </Grid>
          </Grid>
        </form>
        <Snackbar
          open={customSnackbar.open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={customSnackbar.type}>
            {customSnackbar.message}
          </Alert>
        </Snackbar>
      </div>
    </Container>
  );
}

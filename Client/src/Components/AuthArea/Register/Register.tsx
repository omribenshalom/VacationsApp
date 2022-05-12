import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import authService from "../../../Services/AuthService";
import UserModel from "../../../Models/UserModel";
import notify from "../../../Services/NotifyService";
// ---
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FaCashRegister } from "react-icons/fa";

function Register(): JSX.Element {
  const { register, handleSubmit, formState } = useForm<UserModel>();
  const { errors } = formState;

  const navigate = useNavigate();

  async function submit(user: UserModel) {
    try {
      await authService.register(user);
      notify.success("You are now registered.");
      navigate("/home");
    } catch (err: any) {
      notify.error(err);
    }
  }

  const theme = createTheme({
    palette: {},
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <FaCashRegister />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box sx={{ mt: 3 }}>
            <form onSubmit={handleSubmit(submit)}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    fullWidth
                    autoComplete="given-name"
                    autoFocus
                    required
                    {...register("firstName", {
                      required: "Fisrt name is required",
                      pattern: {
                        value: /^([A-Za-z]{2,})+$/i,
                        message: "Invalid First Name",
                      },
                      minLength: {
                        value: 2,
                        message: "First name too short - min 2 notes.",
                      },
                      maxLength: {
                        value: 30,
                        message: "First name too long - max 30 notes.",
                      },
                    })}
                    error={!!errors?.firstName}
                    helperText={
                      errors?.firstName ? errors.firstName.message : null
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    autoComplete="family-name"
                    autoFocus
                    required
                    {...register("lastName", {
                      required: "Last name is required",
                      pattern: {
                        value: /^([A-Za-z]{2,})+$/i,
                        message: "Invalid Last Name",
                      },
                      minLength: {
                        value: 2,
                        message: "Last name too short - min 2 notes.",
                      },
                      maxLength: {
                        value: 30,
                        message: "Last name too long - max 30 notes.",
                      },
                    })}
                    error={!!errors?.lastName}
                    helperText={
                      errors?.lastName ? errors.lastName.message : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="email"
                    name="email"
                    label="Email Address"
                    fullWidth
                    autoComplete="email"
                    autoFocus
                    required
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    error={!!errors?.email}
                    helperText={errors?.email ? errors.email.message : null}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="new-password"
                    fullWidth
                    autoFocus
                    required
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 5,
                        message: "Password must be at least 5 characters",
                      },
                      maxLength: {
                        value: 20,
                        message: "Password maximum characters is 20",
                      },
                    })}
                    error={!!errors?.password}
                    helperText={
                      errors?.password ? errors.password.message : null
                    }
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <NavLink to="/login/" className="navlink">
                    Log-in.
                  </NavLink>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Register;

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../../redux/reducers/sellerReducer";

function SellerSignIn() {
  const { loading, error } = useSelector((state) => state.seller);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(signInStart());
      const formData = new FormData(event.currentTarget);

      const userData = {
        email: formData.get("email"),
        password: formData.get("password"),
      };

      const res = await axios.post("/api/seller/auth/signin", userData);
      const data = await res.data;
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      console.log("sign in successful", data);
      console.log("seller id", data._id);
      navigate(`/seller/dashboard/${data._id}`);
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox name="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              disabled={loading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? "Loading..." : "Sign In"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to={"/seller/sign-up"} variant="body2">
                  Don't have an account? Register
                </Link>
              </Grid>
            </Grid>
            {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SellerSignIn;

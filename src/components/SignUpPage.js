import "./SignUpPage.scss";
import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  Button,
  Box,
  TextField,
  FormControl,
} from "@mui/material";

const SignUpPage = () => {
  //const navigate = useNavigate();
  document.title = "Sign Up | Image Filter";
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  // Updates input state variable when form data changes
  function handleChange(event, property) {
    setInput({ ...input, [property]: event.target.value });
  }

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("form submitted");
    localStorage.setItem("logged_in", true);
    // TODO: backend api call
  }

  return (
    <div className="signup-page">
      <h1 className="signup-page-header">Sign Up</h1>
      <FormControl>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={4}
          type="form"
          component="form"
          onSubmit={(e) => handleSubmit(e)}
        >
          <TextField
            required
            id="signup-page-username-textfield"
            fullWidth
            label="Username"
            title="Username"
            value={input.username}
            onChange={(e) => handleChange(e, "username")}
          ></TextField>
          <TextField
            required
            id="signup-page-password-textfield"
            fullWidth
            label="Password"
            title="Password"
            value={input.password}
            onChange={(e) => handleChange(e, "password")}
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          ></TextField>
          <Button variant="contained" type="submit">Submit</Button>
          <p>
            <a href="/#/login">I already have an account</a>
          </p>
        </Box>
      </FormControl>
    </div>
  );
};

export default SignUpPage;

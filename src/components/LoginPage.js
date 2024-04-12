import "./LoginPage.scss";
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

const LoginPage = () => {
  //const navigate = useNavigate();
  document.title = "Login | Image Filter";
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

  //Forwards data to API
  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    /*fetch("http://localhost:3307/admin/login",{
      method: "POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify()
    }).then(()=>{
      console.log("form submitted")
    })
    localStorage.setItem("logged_in", true);
    */
  }

  return (
    <div className="login-page">
      <h1 className="login-page-header">Login</h1>
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
            id="login-page-username-textfield"
            fullWidth
            label="Username"
            title="Username"
            value={input.username}
            onChange={(e) => handleChange(e, "username")}
          ></TextField>
          <TextField
            required
            id="login-page-password-textfield"
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
          <Button variant="contained" type="submit">
            Submit
          </Button>
          <p>
            Don't have an account? <a href="/#/signup">Sign up here!</a>
          </p>
        </Box>
      </FormControl>
    </div>
  );
};

export default LoginPage;

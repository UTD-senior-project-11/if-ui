import "./LoginPage.scss";
import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  Button,
  Box,
  TextField,
  FormControl,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  document.title = "Login | Image Filter";
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginFail, setLoginFail] = useState(false);

  // Updates input state variable when form data changes
  function handleChange(event, property) {
    setInput({ ...input, [property]: event.target.value });
  }

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    var jsonData = {
      "adminUser": input.username,
      "adminPass": input.password
    }
    console.log(jsonData)
    //Check if account exists and return login status
    await fetch("http://localhost:8080/administrator/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(jsonData)
    }).then(() => {
      console.log("Checking account")
    })
    await fetch("http://localhost:8080/administrator/getlogin", {
      method: "GET"
    }).then(res=>res.json())
    .then((result) => {
      localStorage.setItem("logged_in", result);
      console.log("Updating status");
    }).then(
      getStatus
    )
  }

  //Test to check login status
  function getStatus(){
    const loginStatus = localStorage.getItem("logged_in");
    if(loginStatus === "false") {
      setLoginFail(true);
      console.log("not logged in!!")
    }
    else
    {
      navigate("Home");
      window.location.reload();
    }
    console.log(loginStatus);
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
          {loginFail &&
          <Alert
            severity="error"
            variant="filled"
            sx={{ color: "white", width: "fit-content" }}
            onClose={() => {
                setLoginFail(false)
            }}
        >
            Incorrect username or password
        </Alert>}
          <p>
            Don't have an account? <a href="/#/signup">Sign up here!</a>
          </p>
        </Box>
      </FormControl>
    </div>
  );
};

export default LoginPage;

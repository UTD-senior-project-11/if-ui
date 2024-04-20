import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

const pageNames = ["Home", "Images", "Upload", "Login", "Sign Up"];
const pageRoutes = ["Home", "Grid", "Upload", "Login", "Signup"];

const theme = createTheme({
  palette: {
    primary: {
      main: "#a8bfff",
    },
  },
});

function Navbar() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("logged_in") || "false");

  useEffect(() => {
    const handleStorageChange = () => {
      setLoggedIn(localStorage.getItem("logged_in"));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    }
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <ThemeProvider theme={theme}>
        <AppBar
          position="static"
          color="primary"
          component="nav"
          sx={{ overflow: "scroll" }}
        >
          <Toolbar>
            <Typography
              variant={window.innerWidth <= 600 ? "h6" : "h5"}
              noWrap
              component="a"
              href="/"
              sx={{
                display: "block",
                fontFamily: "sans-serif",
                fontWeight: 700,
                textDecoration: "none",
                letterSpacing: "0.5px",
                overflow: "visible",
                flexGrow: 1,
                "@media (max-width: 600px)": {
                  letterSpacing: "0.2px",
                },
              }}
            >
              ImageFilter
            </Typography>

            <Box sx={{ display: "block" }}>
              <Button
                key={pageNames[0]}
                sx={{
                  color: "#000",
                  "@media (max-width: 600px)": {
                    paddingLeft: 0,
                    paddingRight: 0,
                  },
                }}
                component={Link}
                to={pageRoutes[0]}
              >
                {pageNames[0]}
              </Button>
              {loggedIn === "true" && <Button
                key={pageNames[1]}
                sx={{
                  color: "#000",
                  "@media (max-width: 600px)": {
                    paddingLeft: 0,
                    paddingRight: 0,
                  },
                }}
                component={Link}
                to={pageRoutes[1]}
              >
                {pageNames[1]}
              </Button>}
              {loggedIn === "true" && <Button
                key={pageNames[2]}
                sx={{
                  color: "#000",
                  "@media (max-width: 600px)": {
                    paddingLeft: 0,
                    paddingRight: 0,
                  },
                }}
                component={Link}
                to={pageRoutes[2]}
              >
              {pageNames[2]}
              </Button>}
              {loggedIn === "true" && <Button
                key="Logout"
                sx={{
                  color: "#000",
                  "@media (max-width: 600px)": {
                    paddingLeft: 0,
                    paddingRight: 0,
                  },
                }}
                onClick={() => {
                  console.log("logging out");
                  localStorage.setItem("logged_in", false);
              }}
                component={Link}
                to={pageRoutes[0]}
              >
                Log Out
              </Button>}
              {loggedIn === "false" && <Button
                key={pageNames[3]}
                sx={{
                  color: "#000",
                  "@media (max-width: 600px)": {
                    paddingLeft: 0,
                    paddingRight: 0,
                  },
                }}
                component={Link}
                to={pageRoutes[3]}
              >
              {pageNames[3]}
              </Button>}
              {loggedIn === "false" && <Button
                key={pageNames[4]}
                sx={{
                  color: "#000",
                  "@media (max-width: 600px)": {
                    paddingLeft: 0,
                    paddingRight: 0,
                  },
                }}
                component={Link}
                to={pageRoutes[4]}
              >
              {pageNames[4]}
              </Button>}
            </Box>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Box>
  );
}
export default Navbar;

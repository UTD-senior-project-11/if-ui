import * as React from "react";
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

// let loggedIn = localStorage.getItem("logged_in") || false; // TODO with backend. Local storage for token?

function Navbar() {
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
              {pageNames.map((page, index) => (
                <Button
                  key={page}
                  sx={{
                    color: "#000",
                    "@media (max-width: 600px)": {
                      paddingLeft: 0,
                      paddingRight: 0,
                    },
                  }}
                  component={Link}
                  to={pageRoutes[index]}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Box>
  );
}
export default Navbar;

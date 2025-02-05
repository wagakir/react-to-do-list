import React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { HomeRounded } from "@mui/icons-material";

import "./App.css";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import { useAppDispatch, useAppSelector } from "./hooks";
import { setIsAuth } from "./redux/slices/auth";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispath = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.authSlice);
  const handleClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти?")) {
      dispath(setIsAuth(false));
      window.localStorage.removeItem("auth");
    }
  };
  const handleLoginClick = () => {
    navigate("/auth");
  };
  const handleClickHome = () => {
    navigate("/");
  };
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              {location.pathname !== "/" && (
                <HomeRounded onClick={handleClickHome} />
              )}
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {location.pathname === "/" && "To do list"}
              {location.pathname === "/auth" && "Авторизация"}
            </Typography>
            {isAuth ? (
              <Button
                color="error"
                variant="contained"
                onClick={handleClickLogout}
              >
                Выйти
              </Button>
            ) : (
              <Button color="inherit" onClick={handleLoginClick}>
                Войти
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

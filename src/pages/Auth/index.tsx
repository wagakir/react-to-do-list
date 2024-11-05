import { AddTask } from "@mui/icons-material";
import { Button, Paper, TextField } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setIsAuth } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";

const Auth = () => {
  const dispath = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.authSlice);
  const [loginValue, setLoginValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");

  const handleSubmitAuth = () => {
    if (loginValue !== "admin" || passwordValue !== "admin") {
      alert("Неверный логин или пароль!");
      return;
    } else {
      dispath(setIsAuth(true));
      window.localStorage.setItem(
        "auth",
        JSON.stringify({ login: loginValue, password: passwordValue })
      );
    }
  };
  if (isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <div className="h-full w-full mx-10">
      <Paper
        sx={{
          m: 3,
          p: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignContent: "center",
          flexWrap: "wrap",
        }}
      >
        <TextField
          type="search"
          variant="standard"
          value={loginValue}
          onChange={(event) => setLoginValue(event.target.value)}
          label="Введите задачу"
          sx={{ mx: 3, my: 1, flex: 1, minWidth: 80 }}
        />
        <TextField
          type="password"
          variant="standard"
          value={passwordValue}
          onChange={(event) => setPasswordValue(event.target.value)}
          label="Введите задачу"
          sx={{ mx: 3, my: 1, flex: 1, minWidth: 80 }}
        />
        <Button
          sx={{ mx: 3, my: 1, height: 40, width: "50%" }}
          variant="contained"
          color="success"
          onClick={handleSubmitAuth}
        >
          {"Авторизоваться"}
        </Button>
      </Paper>
    </div>
  );
};

export default Auth;

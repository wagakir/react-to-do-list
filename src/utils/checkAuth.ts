export const checkAuth = () => {
  const data = localStorage.getItem("auth");
  const auth = data !== null ? JSON.parse(data) : false;

  if (auth.login === "admin" && auth.password === "admin") {
    return auth;
  } else {
    return false;
  }
};

const checkAuth = () => {
  return (
    localStorage.getItem("access_token") &&
    localStorage.getItem("refresh_token")
  );
};

export default checkAuth;
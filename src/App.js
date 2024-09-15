import { createTheme, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "@fontsource/roboto";
import Home from "./pages/Home";
import HomeLayout from "./components/HomeLayout";
import AddThread from "./pages/AddThread";
import Leaderboards from "./pages/Leaderboards";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { asyncPreloadProcess } from "./states/isPreload/action";
import { asyncUnsetAuthUser } from "./states/auth/action";
import DetailThread from "./pages/DetailThread";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

function App() {
  const { isPreload = true, authUser } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onLogout = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <ThemeProvider theme={theme}>
        <Routes>
          <Route element={<HomeLayout />}>
            <Route path="/" exact element={<Home />} />
            <Route path="/thread/:threadId" exact element={<DetailThread />} />
            <Route path="/new" exact element={<AddThread />} />
            <Route path="/leaderboards" exact element={<Leaderboards />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/register" exact element={<Register />} />
          </Route>
        </Routes>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route element={<HomeLayout logout={onLogout} />}>
          <Route path="/" exact element={<Home />} />
          <Route path="/new" exact element={<AddThread />} />
          <Route path="/thread/:threadId" exact element={<DetailThread />} />
          <Route path="/leaderboards" exact element={<Leaderboards />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;

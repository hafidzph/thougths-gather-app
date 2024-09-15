import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { GrChatOption } from "react-icons/gr";
import { MdOutlineLeaderboard } from "react-icons/md";
import { IoMdLogIn } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { RiChatNewLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const pages = [
  { name: "Threads", icon: <GrChatOption size={20} />, dest: "/" },
  {
    name: "New Thread",
    icon: <RiChatNewLine size={20} />,
    dest: "/new",
    authRequired: true,
  },
  {
    name: "Leaderboards",
    icon: <MdOutlineLeaderboard size={20} />,
    dest: "/leaderboards",
  },
];

function Navigation({ logout = null }) {
  const { authUser } = useSelector((states) => states);

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#333",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            THOUGHTS-GATHER
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              gap: "20px",
            }}
          >
            {pages
              .filter((page) => !page.authRequired || authUser)
              .map((page) => (
                <Link to={page.dest} key={page.name}>
                  <Button
                    startIcon={page.icon}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "flex",
                      fontSize: 16,
                      fontWeight: 600,
                      alignItems: "center",
                      textTransform: "none",
                      minWidth: "auto",
                    }}
                  >
                    {page.name}
                  </Button>
                </Link>
              ))}
          </Box>

          {authUser ? (
            <Link to="/">
              <Button
                startIcon={<CiLogout size={20} />}
                sx={{
                  my: 2,
                  color: "white",
                  display: "flex",
                  fontSize: 16,
                  fontWeight: 600,
                  alignItems: "center",
                  textTransform: "none",
                  minWidth: "auto",
                }}
                onClick={logout}
              >
                Logout
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button
                startIcon={<IoMdLogIn size={20} />}
                sx={{
                  my: 2,
                  color: "white",
                  display: "flex",
                  fontSize: 16,
                  fontWeight: 600,
                  alignItems: "center",
                  textTransform: "none",
                  minWidth: "auto",
                }}
              >
                Login
              </Button>
            </Link>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

Navigation.propTypes = {
  logout: PropTypes.func,
};

export default Navigation;

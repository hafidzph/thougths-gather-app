import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { customStyleInput } from "../utils/utils";
import useInput from "../hooks/useInput";

function LoginForm({ login }) {
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <TextField
        id="email"
        name="email"
        placeholder="Masukkan Email"
        size="small"
        onChange={onChangeEmail}
        value={email}
        sx={customStyleInput}
        inputProps={{ "data-testid": "email-input" }}
      />

      <TextField
        id="password"
        name="password"
        placeholder="Masukkan Password"
        size="small"
        onChange={onChangePassword}
        value={password}
        type="password"
        sx={customStyleInput}
        inputProps={{ "data-testid": "password-input" }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          textTransform: "none",
          backgroundColor: "#444",
          "&:hover": {
            backgroundColor: "#444",
          },
        }}
      >
        Login
      </Button>
      <span className="text-sm">
        Belum punya akun?&nbsp;
        <Link to="/register" className="text-blue-400 hover:text-blue-300">
          Daftar di sini
        </Link>
      </span>
    </form>
  );
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginForm;

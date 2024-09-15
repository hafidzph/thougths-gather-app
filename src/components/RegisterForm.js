import PropTypes from "prop-types";

import { Button, TextField } from "@mui/material";
import { customStyleInput } from "../utils/utils";
import useInput from "../hooks/useInput";

function RegisterForm({ register }) {
  const [name, onChangeName] = useInput("");
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");

  const handleSubmit = (e) => {
    e.preventDefault();
    register({ name, email, password });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <TextField
        id="name"
        placeholder="Masukkan Nama"
        onChange={onChangeName}
        value={name}
        size="small"
        sx={customStyleInput}
      />

      <TextField
        id="email"
        placeholder="Masukkan Email"
        size="small"
        type="email"
        onChange={onChangeEmail}
        value={email}
        sx={customStyleInput}
      />

      <TextField
        id="password"
        placeholder="Masukkan Password"
        size="small"
        type="password"
        onChange={onChangePassword}
        value={password}
        sx={customStyleInput}
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
        Register
      </Button>
    </form>
  );
}

RegisterForm.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterForm;

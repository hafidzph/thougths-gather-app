import PropTypes from "prop-types";

import { Button, TextField } from "@mui/material";
import { customStyleInput } from "../utils/utils";
import useInput from "../hooks/useInput";

function FormThread({ onCreate }) {
  const [title, onChangeTitle] = useInput("");
  const [body, onChangeBody] = useInput("");
  const [category, onChangeCategory] = useInput("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ title, body, category });
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <TextField
        id="title"
        placeholder="Masukkan Judul"
        size="small"
        value={title}
        onChange={onChangeTitle}
        sx={customStyleInput}
      />
      <TextField
        id="category"
        placeholder="Masukkan Kategorian"
        size="small"
        value={category}
        onChange={onChangeCategory}
        sx={customStyleInput}
      />
      <TextField
        id="body"
        placeholder="Masukkan Isi Diskusi"
        multiline
        rows={5}
        value={body}
        onChange={onChangeBody}
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
        Buat
      </Button>
    </form>
  );
}

FormThread.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default FormThread;

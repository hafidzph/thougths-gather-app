import { Button, TextField } from "@mui/material";
import PropTypes from "prop-types";

import { customStyleInput } from "../utils/utils";
import useInput from "../hooks/useInput";

function CommentForm({ comment }) {
  const [content, onChangeContent] = useInput("");

  const handleSubmit = (e) => {
    e.preventDefault();
    comment({ content });
  };

  return (
    <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
      <TextField
        id="content"
        placeholder="Masukkan Komentar"
        multiline
        rows={4}
        value={content}
        onChange={onChangeContent}
        sx={customStyleInput}
        inputProps={{ "data-testid": "comment-input" }}
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
        Kirim
      </Button>
    </form>
  );
}

CommentForm.propTypes = {
  comment: PropTypes.func.isRequired,
};

export default CommentForm;

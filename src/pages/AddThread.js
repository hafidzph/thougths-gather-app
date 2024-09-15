import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import FormThread from "../components/FormThread";
import { asyncAddThread } from "../states/threads/action";

function AddThread() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onCreateThread = async ({ title, body, category }) => {
    const result = await dispatch(asyncAddThread({ title, body, category }));
    if (result.success) {
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col gap-10 w-full max-w-[40rem] mx-auto">
      <h1 className="text-3xl font-semibold text-center">Buat Diskusi Baru</h1>
      <FormThread onCreate={onCreateThread} />
    </div>
  );
}

export default AddThread;

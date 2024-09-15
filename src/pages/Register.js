import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import RegisterForm from "../components/RegisterForm";
import { asyncRegisterUser } from "../states/users/action";
import { asyncSetAuthUser } from "../states/auth/action";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegister = async ({ name, email, password }) => {
    const result = await dispatch(asyncRegisterUser({ name, email, password }));
    if (result.success) {
      dispatch(asyncSetAuthUser({ email, password }));
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col gap-10 w-full max-w-[40rem] mx-auto">
      <h1 className="text-3xl font-semibold text-center">Register</h1>
      <RegisterForm register={onRegister} />
    </div>
  );
}

export default Register;

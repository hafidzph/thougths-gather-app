import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import LoginForm from "../components/LoginForm";
import { asyncSetAuthUser } from "../states/auth/action";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = async ({ email, password }) => {
    const result = await dispatch(asyncSetAuthUser({ email, password }));
    if (result.success) {
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col gap-10 w-full max-w-[40rem] mx-auto">
      <h1 className="text-3xl font-semibold text-center">Login</h1>
      <LoginForm login={onLogin} />
    </div>
  );
}

export default Login;

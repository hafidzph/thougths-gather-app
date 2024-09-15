import { hideLoading, showLoading } from "react-redux-loading-bar";
import { ActionType } from "../../constants/ActionType";
import api from "../../utils/api";

function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
}

function asyncRegisterUser({ name, email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.register({ name, email, password });
      return { success: true };
    } catch (error) {
      alert(error.message);
      return { success: false };
    } finally {
      dispatch(hideLoading());
    }
  };
}

export { receiveUsersActionCreator, asyncRegisterUser };

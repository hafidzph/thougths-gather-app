import { hideLoading, showLoading } from "react-redux-loading-bar";
import { ActionType } from "../../constants/ActionType";
import api from "../../utils/api";
import { setAuthUserActionCreator } from "../auth/action";

function setIsPreloadActionCreator(isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
}

function asyncPreloadProcess() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      dispatch(setIsPreloadActionCreator(false));
    } finally {
      dispatch(setIsPreloadActionCreator(false));
    }
    dispatch(hideLoading());
  };
}

export { setIsPreloadActionCreator, asyncPreloadProcess };

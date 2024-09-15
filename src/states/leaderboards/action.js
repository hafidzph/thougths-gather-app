import { hideLoading, showLoading } from "react-redux-loading-bar";
import { ActionType } from "../../constants/ActionType";
import api from "../../utils/api";

function receiveLeaderboardsActionCreator(leaderboards) {
  return {
    type: ActionType.RECEIVE_LEADERBOARDS,
    payload: {
      leaderboards,
    },
  };
}

function asyncReceiveLeaderboards() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const leaderboards = await api.getAllLeaderboards();
      dispatch(receiveLeaderboardsActionCreator(leaderboards));
    } catch (err) {
      alert(err.message);
    }
    dispatch(hideLoading());
  };
}

export { asyncReceiveLeaderboards, receiveLeaderboardsActionCreator };

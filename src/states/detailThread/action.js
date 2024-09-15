import { hideLoading, showLoading } from "react-redux-loading-bar";
import { ActionType } from "../../constants/ActionType";
import api from "../../utils/api";
import { receiveCommentActionCreator } from "../comment/action";

function receiveDetailThreadActionCreator(detailThread) {
  return {
    type: ActionType.RECEIVE_DETAIL_THREAD,
    payload: {
      detailThread,
    },
  };
}

function clearDetailThread() {
  return { type: ActionType.CLEAR_DETAIL_THREAD };
}

function upVoteDetailThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.UP_VOTE_DETAIL_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function downVoteDetailThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_DETAIL_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function neutralizVoteDetailThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_DETAIL_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncGetDetailThread(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const detailThread = await api.getThreadDetail(threadId);
      dispatch(receiveDetailThreadActionCreator(detailThread));
      dispatch(receiveCommentActionCreator(detailThread?.comments));
    } catch (err) {
      alert(err.message);
    }

    dispatch(hideLoading());
  };
}

function asyncUpVoteDetailThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(
      upVoteDetailThreadActionCreator({ threadId, userId: authUser.id })
    );
    try {
      await api.upVoteThread(threadId);
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncDownVoteDetailThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(
      downVoteDetailThreadActionCreator({ threadId, userId: authUser.id })
    );
    try {
      await api.downVoteThread(threadId);
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncNeutralizeVoteDetailThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(
      neutralizVoteDetailThreadActionCreator({ threadId, userId: authUser.id })
    );
    try {
      await api.neutralizeThreadVote(threadId);
    } catch (error) {
      alert(error.message);
    }
  };
}

export {
  clearDetailThread,
  asyncGetDetailThread,
  asyncUpVoteDetailThread,
  asyncDownVoteDetailThread,
  asyncNeutralizeVoteDetailThread,
};

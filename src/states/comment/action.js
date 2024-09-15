import { hideLoading, showLoading } from "react-redux-loading-bar";
import { ActionType } from "../../constants/ActionType";
import api from "../../utils/api";

function receiveCommentActionCreator(comment) {
  return {
    type: ActionType.RECEIVE_COMMENT,
    payload: { comment },
  };
}

function createCommentActionCreator(comment) {
  return {
    type: ActionType.CREATE_COMMENT,
    payload: { comment },
  };
}

function upVoteCommentActionCreator(commentId, userId) {
  return {
    type: ActionType.UP_VOTE_COMMENT,
    payload: { commentId, userId },
  };
}

function downVoteCommentActionCreator(commentId, userId) {
  return {
    type: ActionType.DOWN_VOTE_COMMENT,
    payload: { commentId, userId },
  };
}

function neutralizeCommentVoteActionCreator(commentId, userId) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_COMMENT,
    payload: { commentId, userId },
  };
}

function asyncCreateComment({ content }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { detailThread } = getState();

    try {
      const comment = await api.createComment({
        threadId: detailThread.id,
        content,
      });
      dispatch(createCommentActionCreator(comment));
    } catch (err) {
      alert(err.message);
    }
    dispatch(hideLoading());
  };
}

function asyncUpVoteComment({ commentId }) {
  return async (dispatch, getState) => {
    const { authUser, detailThread } = getState();
    dispatch(upVoteCommentActionCreator(commentId, authUser.id));
    try {
      await api.upVoteComment({ threadId: detailThread.id, commentId });
    } catch (err) {
      alert(err.message);
    }
  };
}

function asyncDownVoteComment({ commentId }) {
  return async (dispatch, getState) => {
    const { authUser, detailThread } = getState();
    dispatch(downVoteCommentActionCreator(commentId, authUser.id));
    try {
      await api.downVoteComment({ threadId: detailThread.id, commentId });
    } catch (err) {
      alert(err.message);
    }
  };
}

function asyncNeutralizeCommentVote({ commentId }) {
  return async (dispatch, getState) => {
    const { authUser, detailThread } = getState();
    dispatch(neutralizeCommentVoteActionCreator(commentId, authUser.id));
    try {
      await api.neutralizeCommentVote({ threadId: detailThread.id, commentId });
    } catch (err) {
      alert(err.message);
    }
  };
}

export {
  receiveCommentActionCreator,
  createCommentActionCreator,
  asyncCreateComment,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralizeCommentVote,
};

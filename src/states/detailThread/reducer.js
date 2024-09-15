import { ActionType } from "../../constants/ActionType";

function detailThreadReducer(detailThread = {}, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_DETAIL_THREAD:
      return action.payload.detailThread;
    case ActionType.CLEAR_DETAIL_THREAD:
      return {};
    case ActionType.UP_VOTE_DETAIL_THREAD:
      return {
        ...detailThread,
        upVotesBy: detailThread.upVotesBy.includes(action.payload.userId)
          ? detailThread.upVotesBy.filter((id) => id !== action.payload.userId)
          : detailThread.upVotesBy.concat([action.payload.userId]),
        downVotesBy: detailThread.downVotesBy.filter(
          (id) => id !== action.payload.userId
        ),
      };
    case ActionType.DOWN_VOTE_DETAIL_THREAD:
      return {
        ...detailThread,
        downVotesBy: detailThread.downVotesBy.includes(action.payload.userId)
          ? detailThread.downVotesBy.filter(
              (id) => id !== action.payload.userId
            )
          : detailThread.downVotesBy.concat([action.payload.userId]),
        upVotesBy: detailThread.upVotesBy.filter(
          (id) => id !== action.payload.userId
        ),
      };
    case ActionType.NEUTRALIZE_VOTE_DETAIL_THREAD:
      return {
        ...detailThread,
        upVotesBy: detailThread.upVotesBy.filter(
          (id) => id !== action.payload.userId
        ),
        downVotesBy: detailThread.downVotesBy.filter(
          (id) => id !== action.payload.userId
        ),
      };
    default:
      return detailThread;
  }
}

export default detailThreadReducer;

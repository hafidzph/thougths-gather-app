import { ActionType } from "../../constants/ActionType";

function commentReducer(comment = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_COMMENT:
      return action.payload.comment;
    case ActionType.CREATE_COMMENT:
      return [action.payload.comment, ...comment];
    case ActionType.UP_VOTE_COMMENT:
      return comment.map((currComment) => {
        if (currComment.id === action.payload.commentId) {
          return {
            ...currComment,
            upVotesBy: currComment.upVotesBy.includes(action.payload.userId)
              ? currComment.upVotesBy.filter(
                  (id) => id !== action.payload.userId
                )
              : currComment.upVotesBy.concat([action.payload.userId]),
            downVotesBy: currComment.downVotesBy.filter(
              (id) => id !== action.payload.userId
            ),
          };
        }
        return currComment;
      });
    case ActionType.DOWN_VOTE_COMMENT:
      return comment.map((currComment) => {
        if (currComment.id === action.payload.commentId) {
          return {
            ...currComment,
            upVotesBy: currComment.upVotesBy.filter(
              (id) => id !== action.payload.userId
            ),
            downVotesBy: currComment.downVotesBy.includes(action.payload.userId)
              ? currComment.downVotesBy.filter(
                  (id) => id !== action.payload.userId
                )
              : currComment.downVotesBy.concat([action.payload.userId]),
          };
        }
        return currComment;
      });
    case ActionType.NEUTRALIZE_VOTE_COMMENT:
      return comment.map((currComment) => {
        if (currComment.id === action.payload.commentId) {
          return {
            ...currComment,
            upVotesBy: currComment.upVotesBy.filter(
              (id) => id !== action.payload.userId
            ),
            downVotesBy: currComment.downVotesBy.filter(
              (id) => id !== action.payload.userId
            ),
          };
        }
        return currComment;
      });
    default:
      return comment;
  }
}

export default commentReducer;

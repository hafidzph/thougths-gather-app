const ActionType = {
  SET_AUTH_USER: "SET_AUTH_USER",
  UNSET_AUTH_USER: "UNSET_AUTH_USER",
  SET_IS_PRELOAD: "SET_IS_PRELOAD",
  RECEIVE_USERS: "RECEIVE_USERS",

  RECEIVE_THREADS: "RECEIVE_THREADS",
  ADD_THREAD: "ADD_THREAD",
  UP_VOTE_THREAD: "UP_VOTE_THREAD",
  DOWN_VOTE_THREAD: "DOWN_VOTE_THREAD",
  NEUTRALIZE_VOTE_THREAD: "NEUTRALIZE_VOTE_THREAD",

  RECEIVE_COMMENT: "RECEIVE_COMMENT",
  CREATE_COMMENT: "CREATE_COMMENT",
  UP_VOTE_COMMENT: "UP_VOTE_COMMENT",
  DOWN_VOTE_COMMENT: "DOWN_VOTE_COMMENT",
  NEUTRALIZE_VOTE_COMMENT: "NEUTRALIZE_VOTE_COMMENT",

  RECEIVE_DETAIL_THREAD: "RECEIVE_DETAIL_THREAD",
  CLEAR_DETAIL_THREAD: "CLEAR_DETAIL_THREAD",
  UP_VOTE_DETAIL_THREAD: "UP_VOTE_DETAIL_THREAD",
  DOWN_VOTE_DETAIL_THREAD: "DOWN_VOTE_DETAIL_THREAD",
  NEUTRALIZE_VOTE_DETAIL_THREAD: "NEUTRALIZE_VOTE_DETAIL_THREAD",

  RECEIVE_LEADERBOARDS: "RECEIVE_LEADERBOARDS",
};

export { ActionType };

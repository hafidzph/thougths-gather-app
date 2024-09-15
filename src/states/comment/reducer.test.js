// Scenario test for commentReducers
// - should return the initial state when given by unknown action
// - should return the comments when given by RECEIVE_COMMENT action
// - should return the comment with the new comment when given by CREATE_COMMENT action
// - should upVote the comment when given by UP_VOTE_COMMENT action
// - should downVote the comment when given by DOWN_VOTE_COMMENT action
// - should neutralize the comment vote when given by NEUTRALIZE_VOTE_COMMENT action

import commentReducer from "./reducer";

describe("commentReducers function", () => {
  it("should return the initial state when given by unknown action", () => {
    const initialState = [];
    const action = { type: "UNKNOWN" };

    const nextState = commentReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it("should return the comments when given by RECEIVE_COMMENT action", () => {
    const initialState = [];

    const action = {
      type: "RECEIVE_COMMENT",
      payload: {
        comment: [
          {
            id: "comment-1",
            content: "Ini adalah komentar pertama",
            createdAt: "2021-06-21T07:00:00.000Z",
            owner: {
              id: "users-1",
              name: "John Doe",
              avatar: "https://generated-image-url.jpg",
            },
            upVotesBy: [],
            downVotesBy: [],
          },
        ],
      },
    };

    const nextState = commentReducer(initialState, action);

    expect(nextState).toEqual(action.payload.comment);
  });

  it("should return the comment with the new comment when given by CREATE_COMMENT action", () => {
    const initialState = [
      {
        id: "comment-1",
        content: "Ini adalah komentar pertama",
        createdAt: "2021-06-21T07:00:00.000Z",
        upVotesBy: [],
        downVotesBy: [],
        owner: {
          id: "users-1",
          name: "John Doe",
          email: "john@example.com",
        },
      },
    ];

    const action = {
      type: "CREATE_COMMENT",
      payload: {
        comment: {
          id: "comment-2",
          content: "Ini adalah komentar kedua",
          createdAt: "2024-08-25T07:00:00.000Z",
          upVotesBy: [],
          downVotesBy: [],
          owner: {
            id: "users-2",
            name: "Malen",
            email: "malen@example.com",
          },
        },
      },
    };

    // action
    const nextState = commentReducer(initialState, action);

    // assert
    expect(nextState).toEqual([action.payload.comment, ...initialState]);
  });

  it("should upVote the comment when given by UP_VOTE_COMMENT action", () => {
    const initialState = [
      {
        id: "comment-1",
        content: "Ini adalah komentar pertama",
        createdAt: "2021-06-21T07:00:00.000Z",
        upVotesBy: [],
        downVotesBy: [],
        owner: {
          id: "users-1",
          name: "John Doe",
          email: "john@example.com",
        },
      },
    ];

    const action = {
      type: "UP_VOTE_COMMENT",
      payload: {
        commentId: "comment-1",
        userId: "users-2",
      },
    };

    const nextState = commentReducer(initialState, action);

    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [action.payload.userId],
        downVotesBy: [],
      },
    ]);
  });

  it("should downVote the comment when given by DOWN_VOTE_COMMENT action", () => {
    const initialState = [
      {
        id: "comment-1",
        content: "Ini adalah komentar pertama",
        createdAt: "2021-06-21T07:00:00.000Z",
        upVotesBy: [],
        downVotesBy: [],
        owner: {
          id: "users-1",
          name: "John Doe",
          email: "john@example.com",
        },
      },
    ];

    const action = {
      type: "DOWN_VOTE_COMMENT",
      payload: {
        commentId: "comment-1",
        userId: "users-2",
      },
    };

    const nextState = commentReducer(initialState, action);

    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [],
        downVotesBy: [action.payload.userId],
      },
    ]);
  });

  it("should neutralize the comment vote when given by NEUTRALIZE_VOTE_COMMENT action", () => {
    const initialState = [
      {
        id: "comment-1",
        content: "Ini adalah komentar pertama",
        createdAt: "2021-06-21T07:00:00.000Z",
        upVotesBy: [],
        downVotesBy: [],
        owner: {
          id: "users-1",
          name: "John Doe",
          email: "john@example.com",
        },
      },
    ];

    const action = {
      type: "NEUTRALIZE_VOTE_COMMENT",
      payload: {
        commentId: "comment-1",
        userId: "users-2",
      },
    };

    const nextState = commentReducer(initialState, action);

    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [],
        downVotesBy: [],
      },
    ]);
  });
});

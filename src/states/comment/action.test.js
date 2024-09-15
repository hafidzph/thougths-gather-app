// Scenario test for asyncCreateComment
// - should dispatch action correctly when create comment
// - should dispatch action and call alert correctly when create comment failed

import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";
import { asyncCreateComment, createCommentActionCreator } from "./action";

const fakeCommentsResponse = [
  {
    id: "comment-1",
    content: "Ini adalah komentar pertama",
    createdAt: "2021-06-21T07:00:00.000Z",
    owner: {
      id: "users-1",
      name: "John Doe",
      avatar: "https://generated-image-url.jpg",
    },
    upVotesBy: ["users-1", "users-2"],
    downVotesBy: [],
  },
];

const fakeErrorResponse = new Error("Ups, something went wrong");

describe("asyncCreateComment thunk", () => {
  beforeEach(() => {
    api._createComment = api.createComment;
  });

  afterEach(() => {
    api.createComment = api._createComment;

    delete api._createComment;
  });

  it("should dispatch action correctly when create comment", async () => {
    api.createComment = () => Promise.resolve(fakeCommentsResponse);

    const dispatch = jest.fn();
    const getState = jest.fn(() => ({
      detailThread: { id: "thread-1" },
    }));

    await asyncCreateComment({ content: "Hello world!" })(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      createCommentActionCreator(fakeCommentsResponse)
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it("should dispatch action and call alert correctly when create comment failed", async () => {
    api.createComment = () => Promise.reject(fakeErrorResponse);

    const dispatch = jest.fn();
    const getState = jest.fn(() => ({
      detailThread: { id: "thread-1" },
    }));

    window.alert = jest.fn();

    await asyncCreateComment({ content: "Hello world!" })(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

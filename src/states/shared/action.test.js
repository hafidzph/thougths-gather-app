// Scenario test for asyncPopulateUsersAndThreads
// - should dispatch action correctly when data fetching success
// - should dispatch action and call alert correctly when data fetching failed

import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";
import { receiveThreadsActionCreator } from "../threads/action";
import asyncPopulateUsersAndThreads from "./action";
import { receiveUsersActionCreator } from "../users/action";

const fakeUsersResponse = [
  {
    id: "john_doe",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://generated-image-url.jpg",
  },
  {
    id: "jane_doe",
    name: "Jane Doe",
    email: "jane@example.com",
    avatar: "https://generated-image-url.jpg",
  },
  {
    id: "fulan",
    name: "Si Fulan",
    email: "fulan@example.com",
    avatar: "https://generated-image-url.jpg",
  },
];

const fakeThreadsResponse = [
  {
    id: "thread-1",
    title: "Thread Pertama",
    body: "Ini adalah thread pertama",
    category: "General",
    createdAt: "2021-06-21T07:00:00.000Z",
    ownerId: "users-1",
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
  {
    id: "thread-2",
    title: "Thread Kedua",
    body: "Ini adalah thread kedua",
    category: "General",
    createdAt: "2021-06-21T07:00:00.000Z",
    ownerId: "users-2",
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
];

const fakeErrorResponse = new Error("Ups, something went wrong");

describe("asyncPopulateUsersAndThreads thunk", () => {
  beforeEach(() => {
    api._getAllUsers = api.getAllUsers;
    api._getAllThreads = api.getAllThreads;
  });

  afterEach(() => {
    api.getAllUsers = api._getAllUsers;
    api.getAllThreads = api._getAllThreads;

    delete api._getAllUsers;
    delete api._getAllThreads;
  });

  it("should dispatch action correctly when data fetching success", async () => {
    api.getAllUsers = jest.fn(() => Promise.resolve(fakeUsersResponse));
    api.getAllThreads = jest.fn(() => Promise.resolve(fakeThreadsResponse));

    const dispatch = jest.fn();

    await asyncPopulateUsersAndThreads()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      receiveUsersActionCreator(fakeUsersResponse)
    );
    expect(dispatch).toHaveBeenCalledWith(
      receiveThreadsActionCreator(fakeThreadsResponse)
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it("should dispatch action and call alert correctly when data fetching failed", async () => {
    api.getAllUsers = jest.fn(() => Promise.reject(fakeErrorResponse));
    api.getAllThreads = jest.fn(() => Promise.reject(fakeErrorResponse));

    const dispatch = jest.fn();

    window.alert = jest.fn();

    await asyncPopulateUsersAndThreads()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

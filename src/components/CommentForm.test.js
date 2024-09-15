/**
 * - Comment component
 *   - should handle comment typing correctly
 *   - should call comment function when Kirim button is clicked
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { act } from "react";
import CommentForm from "./CommentForm";

describe("CommentForm component", () => {
  it("should handle comment typing correctly", async () => {
    render(
      <BrowserRouter>
        <CommentForm comment={() => {}} />
      </BrowserRouter>
    );

    const commentInput = await screen.findByTestId("comment-input");

    await act(async () => {
      await userEvent.type(commentInput, "Hello World!");
    });

    expect(commentInput.value).toBe("Hello World!");
  });

  it("should call comment function when kirim button is clicked", async () => {
    const mockComment = jest.fn();

    render(
      <BrowserRouter>
        <CommentForm comment={mockComment} />
      </BrowserRouter>
    );

    const commentInput = await screen.findByTestId("comment-input");

    await act(async () => {
      await userEvent.type(commentInput, "Hello World!");
    });

    const kirimButton = await screen.getByRole("button", { name: "Kirim" });

    await act(async () => {
      await userEvent.click(kirimButton);
    });

    expect(mockComment).toBeCalledWith({
      content: "Hello World!",
    });
  });
});

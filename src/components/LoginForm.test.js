/**
 * - LoginForm component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { act } from "react";
import LoginForm from "./LoginForm";

describe("LoginForm component", () => {
  it("should handle email typing correctly", async () => {
    render(
      <BrowserRouter>
        <LoginForm login={() => {}} />
      </BrowserRouter>
    );

    const emailInput = await screen.findByTestId("email-input");

    await act(async () => {
      await userEvent.type(emailInput, "email@test.com");
    });

    expect(emailInput.value).toBe("email@test.com");
  });

  it("should handle password typing correctly", async () => {
    render(
      <BrowserRouter>
        <LoginForm login={() => {}} />
      </BrowserRouter>
    );

    const passwordInput = await screen.findByTestId("password-input");

    await act(async () => {
      await userEvent.type(passwordInput, "passwordtest");
    });

    expect(passwordInput.value).toBe("passwordtest");
  });

  it("should call login function when login button is clicked", async () => {
    const mockLoginFunction = jest.fn();

    render(
      <BrowserRouter>
        <LoginForm login={mockLoginFunction} />
      </BrowserRouter>
    );

    const emailInput = await screen.findByTestId("email-input");
    await act(async () => {
      await userEvent.type(emailInput, "email@test.com");
    });

    const passwordInput = await screen.findByTestId("password-input");
    await act(async () => {
      await userEvent.type(passwordInput, "passwordtest");
    });

    const loginButton = await screen.getByRole("button", { name: "Login" });

    await act(async () => {
      await userEvent.click(loginButton);
    });

    expect(mockLoginFunction).toBeCalledWith({
      email: "email@test.com",
      password: "passwordtest",
    });
  });
});

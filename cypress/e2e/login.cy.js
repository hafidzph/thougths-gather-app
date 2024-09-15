/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when username is empty
 *   - should display alert when password is empty
 *   - should display alert when username and password are wrong
 *   - should display homepage when username and password are correct
 */

describe("Login spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });

  it("should display login page correctly", () => {
    cy.get('input[placeholder="Masukkan Email"]').should("be.visible");
    cy.get('input[placeholder="Masukkan Password"]').should("be.visible");
    cy.get("button")
      .contains(/^Login$/)
      .should("be.visible");
  });

  it("should display alert when email is empty", () => {
    cy.get("button")
      .contains(/^Login$/)
      .click();

    cy.on("window:alert", (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it("should display alert when password is empty", () => {
    cy.get('input[placeholder="Masukkan Email"]').type("test@email.copm");

    cy.get("button")
      .contains(/^Login$/)
      .click();

    cy.on("window:alert", (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it("should display alert when email and password are wrong", () => {
    cy.get('input[placeholder="Masukkan Email"]').type("test@email.com");

    cy.get('input[placeholder="Masukkan Password"]').type("wrong_password");

    cy.get("button")
      .contains(/^Login$/)
      .click();

    cy.on("window:alert", (str) => {
      expect(str).to.equal("User ID or password is wrong");
    });
  });

  it("should display homepage when username and password are correct", () => {
    cy.get('input[placeholder="Masukkan Email"]').type("tesst@gmail.com");

    cy.get('input[placeholder="Masukkan Password"]').type("test123");

    cy.get("form").within(() => {
      cy.get("button")
        .contains(/^Login$/)
        .click();
    });

    cy.get("button")
      .contains(/^Logout$/)
      .should("be.visible");
  });
});

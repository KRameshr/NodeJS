describe("Navigation", () => {
  it("navigates from home to contact", () => {
    cy.visit("http://localhost:3000");

    cy.contains("Contact").click();

    cy.url().should("include", "/contact");

    cy.contains("Contact page"); // verify content
  });
});

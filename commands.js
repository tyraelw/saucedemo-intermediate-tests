/**
 * Custom Cypress Commands - Intermediate Level
 * 
 * Reusable commands used across multiple test suites.
 * Commands defined here are automatically available in all test files.
 */

/**
 * Login Command
 * 
 * Performs complete login flow. Used extensively in intermediate tests
 * to reduce code duplication and improve test maintainability.
 * 
 * @param {string} username - The username to login with
 * @param {string} password - The password to login with
 * 
 * @example
 * // Basic usage in test
 * cy.login('standard_user', 'secret_sauce')
 * 
 * @example
 * // Used in beforeEach for automatic login
 * beforeEach(() => {
 *   cy.visit('https://www.saucedemo.com/')
 *   cy.login('standard_user', 'secret_sauce')
 * })
 * 
 * @example
 * // Data-driven testing with forEach
 * users.forEach(user => {
 *   cy.login(user, 'secret_sauce')
 * })
 */
Cypress.Commands.add('login', (username, password) => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('#user-name').type(username)
    cy.get('#password').type(password)
    cy.get('#login-button').click()
})

/**
 * Note on Command Design:
 * 
 * This login command includes cy.visit() for convenience, making it a 
 * complete "go to page and login" action. In production scenarios, you 
 * might separate these concerns (navigation vs. authentication) depending 
 * on your test needs.
 * 
 * The command intentionally does NOT validate success/failure, allowing 
 * each test to define its own expected outcome. This makes the command 
 * flexible enough to test both successful logins and error cases.
 */

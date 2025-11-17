/// <reference types='cypress' />

/**
 * SauceDemo - Intermediate Cypress Tests
 * 
 * Demonstrates data-driven testing, custom commands, conditional logic,
 * and complex test workflows across multiple test suites.
 */

// Test data array for data-driven testing
const users = ['standard_user', 'locked_out_user', 'problem_user']

// ============================================================================
// Test Suite 1: Data-Driven Login Tests
// ============================================================================

describe('Data-Driven Login Tests', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
    cy.clearAllCookies()
    cy.clearAllLocalStorage()
  })

  // Dynamically generate test for each user in array
  users.forEach(user => {
    it(`should handle login attempt for ${user}`, () => {
      // Use custom command for login
      cy.login(user, 'secret_sauce')
      
      // Conditional validation based on user type
      if (user === 'locked_out_user') {
        // Locked user should see error message
        cy.get('h3[data-test="error"]')
          .should('be.visible')
          .and('contain', 'locked out')
      } else {
        // Valid users should reach inventory page
        cy.url().should('include', 'inventory')
      }
    })
  })

})

// ============================================================================
// Test Suite 2: Product Tests
// ============================================================================

describe('Product Tests', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
    cy.clearAllCookies()
    cy.clearAllLocalStorage()
    // Use custom command to login before each test
    cy.login('standard_user', 'secret_sauce')
  })

  it('should display all 6 products on inventory page', () => {
    // Validate product count using .find() within container
    cy.get('.inventory_list')
      .find('.inventory_item')
      .should('have.length', 6)
  })

  it('should add product to cart and update badge', () => {
    // Click specific product's add to cart button
    cy.get("#add-to-cart-sauce-labs-backpack").click()
    
    // Verify cart badge shows correct count
    cy.get('.shopping_cart_link').should('have.text', '1')
  })

})

// ============================================================================
// Test Suite 3: Shopping Cart Tests
// ============================================================================

describe('Shopping Cart Tests', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
    // Login and add product to cart before each test
    cy.login('standard_user', 'secret_sauce')
    cy.get("#add-to-cart-sauce-labs-backpack").click()
    cy.get('.shopping_cart_link').click()
  })

  it('should display the added product in cart', () => {
    // Verify one item appears in cart
    cy.get('.cart_item').should('have.length', 1)
  })

  it('should remove product from cart successfully', () => {
    // Click remove button
    cy.get('#remove-sauce-labs-backpack').click()
    
    // Verify product name no longer exists
    cy.get('.inventory_item_name').should('not.exist')
  })

  it('should navigate to checkout page', () => {
    // Click checkout button
    cy.get('#checkout').click()
    
    // Verify URL changed to checkout step one
    cy.url().should('include', 'checkout-step-one')
  })

})

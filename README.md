# SauceDemo - Intermediate Cypress Tests

Intermediate-level UI automation project demonstrating data-driven testing, custom commands, conditional logic, and organized test suites using Cypress framework.

## 📋 Project Overview

This project showcases intermediate Cypress testing skills through 8 tests organized in 3 test suites. It demonstrates custom command usage, data-driven testing with JavaScript arrays and `forEach`, conditional test logic, and complex test workflows including cart management and checkout navigation.

## 🎯 What I Learned

This project demonstrates my ability to:

- **Create and use custom commands** to reduce code duplication
- **Implement data-driven testing** using arrays and `forEach` loops
- **Apply conditional logic** in tests for different user scenarios
- **Organize tests into logical suites** with multiple `describe` blocks
- **Use advanced selectors** including `.find()` for nested elements
- **Chain complex user workflows** across multiple pages
- **Set up complex test state** in `beforeEach` hooks
- **Validate dynamic content** like cart badge counters
- **Test negative scenarios** (locked user) alongside positive ones
- **Structure maintainable test code** using reusable patterns

## 📊 Test Coverage

### Suite 1: Data-Driven Login Tests (3 tests)

Uses `forEach` to automatically generate tests for multiple user types:

| User Type | Expected Behavior |
|-----------|------------------|
| standard_user | Successfully logs in, reaches inventory page |
| locked_out_user | Shows error message, login blocked |
| problem_user | Successfully logs in, reaches inventory page |

### Suite 2: Product Tests (2 tests)

| Test | Purpose |
|------|---------|
| should display all 6 products | Validates product count on inventory page |
| should add product to cart | Tests add-to-cart functionality and badge update |

### Suite 3: Shopping Cart Tests (3 tests)

| Test | Purpose |
|------|---------|
| should display added product | Verifies product appears in cart |
| should remove product from cart | Tests product removal functionality |
| should navigate to checkout | Validates checkout button navigation |

**Total: 8 automated tests across 3 test suites**

## 🛠️ Technologies Used

- **Cypress** v13+ - Modern E2E testing framework
- **JavaScript** - Test scripting and data structures
- **Custom Commands** - Reusable test components
- **Data-Driven Patterns** - Array-based test generation

## 🔑 Key Concepts Demonstrated

### 1. Data-Driven Testing

```javascript
// Define test data
const users = ['standard_user', 'locked_out_user', 'problem_user']

// Generate test for each user automatically
users.forEach(user => {
  it(`should handle login attempt for ${user}`, () => {
    cy.login(user, 'secret_sauce')
  })
})
```

**Benefits:**
- Reduces code duplication
- Easy to add new test cases (just add to array)
- Maintains consistency across similar tests

### 2. Custom Commands

```javascript
// Define once in commands.js
Cypress.Commands.add('login', (username, password) => {
  cy.visit('https://www.saucedemo.com/')
  cy.get('#user-name').type(username)
  cy.get('#password').type(password)
  cy.get('#login-button').click()
})

// Use everywhere
cy.login('standard_user', 'secret_sauce')
```

**Benefits:**
- Code reusability across tests
- Easier maintenance (change once, affects all tests)
- Cleaner, more readable tests

### 3. Conditional Test Logic

```javascript
if (user === 'locked_out_user') {
  // Validate error message for locked user
  cy.get('[data-test="error"]')
    .should('be.visible')
    .and('contain', 'locked out')
} else {
  // Validate successful login for valid users
  cy.url().should('include', 'inventory')
}
```

**Benefits:**
- Single test handles multiple scenarios
- Demonstrates understanding of different user states
- Flexible validation based on context

### 4. Test Suite Organization

```javascript
describe('Login Tests', () => {
  // Tests related to login
})

describe('Product Tests', () => {
  // Tests related to products
})

describe('Cart Tests', () => {
  // Tests related to cart
})
```

**Benefits:**
- Logical grouping of related tests
- Better test report organization
- Easier to run specific suites

### 5. Complex Test Setup

```javascript
beforeEach(() => {
  cy.visit('https://www.saucedemo.com/')
  cy.login('standard_user', 'secret_sauce')
  cy.get("#add-to-cart-sauce-labs-backpack").click()
  cy.get('.shopping_cart_link').click()
})
```

**Benefits:**
- Each test starts in cart with product already added
- Reduces redundant actions in tests
- Focuses each test on specific functionality

## 🚀 How to Run

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd saucedemo-intermediate-tests
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

### Running Tests

**Open Cypress Test Runner (Interactive)**
```bash
npx cypress open
```
- Select "E2E Testing"
- Choose a browser
- Click on `intermediate-test.cy.js`

**Run Tests in Headless Mode**
```bash
npx cypress run
```

**Run Specific Test Suite**
```bash
npx cypress run --spec "cypress/e2e/intermediate-test.cy.js"
```

### Expected Results
```
Data-Driven Login Tests
  ✓ should handle login attempt for standard_user
  ✓ should handle login attempt for locked_out_user
  ✓ should handle login attempt for problem_user

Product Tests
  ✓ should display all 6 products on inventory page
  ✓ should add product to cart and update badge

Shopping Cart Tests
  ✓ should display the added product in cart
  ✓ should remove product from cart successfully
  ✓ should navigate to checkout page

8 passing (10s)
```

## 📁 Project Structure

```
saucedemo-intermediate-tests/
├── cypress/
│   ├── e2e/
│   │   └── intermediate-test.cy.js  # Main test file
│   ├── support/
│   │   ├── commands.js              # Custom login command
│   │   └── e2e.js                   # Test configuration
│   └── fixtures/                    # Test data (if needed)
├── cypress.config.js                # Cypress configuration
├── package.json                     # Project dependencies
└── README.md                        # This file
```

## 🎓 Skills Demonstrated

### Advanced Cypress Patterns
- Custom command creation and usage
- Data-driven test generation with `forEach`
- Conditional test logic with if/else
- Multiple test suite organization
- Complex `beforeEach` setup workflows

### JavaScript Proficiency
- Array manipulation and iteration
- Template literals for dynamic test names
- Arrow functions
- Conditional statements in test context

### Test Design
- DRY principle with custom commands
- Test isolation despite shared setup
- Logical test suite organization
- Appropriate use of hooks

### Quality Assurance Mindset
- Testing multiple user types automatically
- Validating both positive and negative scenarios
- Complete workflow testing (add → view → remove)
- Comprehensive cart and checkout validation

## 📈 Progression from Basic to Intermediate

### Basic Project
- ✅ Native Cypress commands
- ✅ Simple, explicit tests
- ✅ Independent test cases
- ✅ Single test suite

### Intermediate Project (This One)
- ✅ **Custom commands** (`cy.login()`)
- ✅ **Data-driven testing** (3 users, 1 test definition)
- ✅ **Conditional logic** (different validations per user)
- ✅ **Multiple test suites** (3 organized suites)
- ✅ **Complex workflows** (login → add to cart → view cart)
- ✅ **Advanced selectors** (`.find()` for nested elements)

### What's Next: Advanced
- Page Object Model architecture
- Custom commands library
- API mocking and stubbing
- Network request interception
- CI/CD pipeline integration

## 🔗 Related Projects

- [SauceDemo Basic Tests](../saucedemo-basic-tests) - Foundation Cypress skills
- [Cypress E-Commerce Advanced](../cypress-ecommerce-testing) - Page Object Model implementation
- [API Intermediate Testing](../api-intermediate-testing) - Advanced API patterns with variable chaining

## 💡 Design Decisions

### Why Custom Commands?

The `cy.login()` command is used **7 times** across the test file:
- 3 times in data-driven login tests
- 1 time in Product Tests beforeEach
- 1 time in Cart Tests beforeEach

Without the custom command, we'd repeat these 4 lines of code 7 times = **28 lines of duplicated code**. The custom command reduces this to 7 single-line calls and maintains the logic in one place.

### Why Data-Driven Testing?

Instead of writing 3 separate, nearly identical login tests, the `forEach` loop generates them automatically from an array. To add a new user test, simply add the username to the array—no need to copy and paste test code.

### Why Conditional Logic?

The `locked_out_user` behaves differently than other users. Rather than creating a completely separate test, conditional logic handles both scenarios in one test definition, demonstrating understanding of different user states.

## 🧪 Test Philosophy

These tests follow intermediate-level best practices:

1. **Code Reusability** - Custom commands eliminate duplication
2. **Data-Driven** - Tests scale easily with data changes
3. **Organized** - Logical suite structure improves maintainability
4. **Realistic Workflows** - Tests follow actual user journeys
5. **Flexible** - Conditional logic handles multiple scenarios

## 📝 Notes

- **Application Under Test**: [SauceDemo](https://www.saucedemo.com/)
- **Test Users**: Available on login page
- **Custom Command**: `cy.login()` defined in `cypress/support/commands.js`
- **Test Independence**: Each test can run independently despite shared setup
- **Browser Compatibility**: Tested on Chrome, Firefox, Edge

## 📧 Questions?

Feel free to reach out if you have questions about this project or intermediate Cypress patterns!

---

**Created as part of my QA Testing portfolio** | **Date: November 2025**

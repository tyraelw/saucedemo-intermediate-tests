# 🧪 SauceDemo - Intermediate Cypress Tests
![Cypress](https://img.shields.io/badge/Cypress-17202C?style=flat&logo=cypress&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) ![E2E Testing](https://img.shields.io/badge/E2E-Testing-green)

Intermediate-level UI automation project demonstrating data-driven testing, custom commands, conditional logic, and organized test suites using Cypress framework.

## 📋 Project Overview

This project showcases intermediate Cypress testing patterns through 8 tests organized in 3 test suites. It demonstrates custom command usage, data-driven testing with JavaScript arrays and forEach, conditional test logic, and complex test workflows including cart management and checkout navigation.

## 📊 Test Coverage

### Suite 1: Data-Driven Login Tests (3 tests)

Uses forEach to automatically generate tests for multiple user types:

| User Type | Expected Behavior |
|-----------|-------------------|
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

**Total:** 8 automated tests across 3 test suites

## 🛠️ Technologies Used

- **Cypress v13+** - Modern E2E testing framework
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
1. Select "E2E Testing"
2. Choose a browser
3. Click on `intermediate-test.cy.js`

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
└── README.md                        # Documentation
```

## 🎯 Skills Demonstrated

### Advanced Cypress Patterns
- Custom command creation and usage
- Data-driven test generation with forEach
- Conditional test logic with if/else
- Multiple test suite organization
- Complex beforeEach setup workflows

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

## 💡 Design Decisions

### Why Custom Commands?

The `cy.login()` command is used 7 times across the test file:
- 3 times in data-driven login tests
- 1 time in Product Tests beforeEach
- 1 time in Cart Tests beforeEach

Without the custom command, we'd repeat these 4 lines of code 7 times = 28 lines of duplicated code. The custom command reduces this to 7 single-line calls and maintains the logic in one place.

### Why Data-Driven Testing?

Instead of writing 3 separate, nearly identical login tests, the forEach loop generates them automatically from an array. To add a new user test, simply add the username to the array—no need to copy and paste test code.

### Why Conditional Logic?

The `locked_out_user` behaves differently than other users. Rather than creating a completely separate test, conditional logic handles both scenarios in one test definition, demonstrating understanding of different user states.

## 🧪 Test Philosophy

These tests follow intermediate-level best practices:

- **Code Reusability** - Custom commands eliminate duplication
- **Data-Driven** - Tests scale easily with data changes
- **Organized** - Logical suite structure improves maintainability
- **Realistic Workflows** - Tests follow actual user journeys
- **Flexible** - Conditional logic handles multiple scenarios

## 📝 Notes

- **Application Under Test:** SauceDemo
- **Test Users:** Available on login page
- **Custom Command:** `cy.login()` defined in `cypress/support/commands.js`
- **Test Independence:** Each test can run independently despite shared setup
- **Browser Compatibility:** Tested on Chrome, Firefox, Edge

## 🔗 Related Projects

- [SauceDemo Basic Tests](link) - Core Cypress patterns
- [Cypress E-Commerce Testing](link) - Page Object Model implementation
- [API Intermediate Testing](link) - Advanced API patterns with variable chaining

## 👤 Author

**Isrrael Andres Toro Alvarez**

- GitHub: [@tyraelw](https://github.com/tyraelw)
- LinkedIn: [Isrrael Toro Alvarez](https://linkedin.com/in/your-profile)
- Email: tyrael78w@gmail.com

## 📧 Contact

For questions about this project or intermediate Cypress patterns: tyrael78w@gmail.com

---

*Part of QA Testing Portfolio | November 2025*

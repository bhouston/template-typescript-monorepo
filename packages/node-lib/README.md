# Testing Documentation

## Test Configuration Structure

The test configuration is managed through the following files:

- `jest.config.js` - Main Jest configuration file
- `tsconfig.json` - TypeScript configuration for tests

## Running Tests

You can run tests using the following npm commands:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test:watch

# Run tests with coverage
npm test:coverage
```

## Test File Naming Conventions

Follow these naming conventions for test files:

- Test files should be named with `.test.ts` or `.spec.ts` extension
- Test files should be placed next to the source files they test
- Use descriptive names that match the module being tested

Example:

```
src/
  ├── utils/
  │   ├── parser.ts
  │   └── parser.test.ts
  └── services/
      ├── auth.ts
      └── auth.test.ts
```

## Coverage Reporting

Test coverage reports are generated automatically when running `npm test:coverage`. The coverage report includes:

- Statement coverage
- Branch coverage
- Function coverage
- Line coverage

Coverage reports are generated in the `coverage/` directory.

## Testing Best Practices

1. **Test Organization**

   - Use describe blocks to group related tests
   - Use clear, descriptive test names
   - Follow the Arrange-Act-Assert pattern

2. **Mocking**

   - Mock external dependencies
   - Use Jest's mock functions for callbacks and services
   - Keep mocks simple and focused

3. **Test Isolation**

   - Each test should be independent
   - Clean up after tests using beforeEach/afterEach
   - Don't share state between tests

4. **Assertions**
   - Use specific assertions (prefer `toBe` over `toEqual` when possible)
   - Test both positive and negative cases
   - Include edge cases

Example Test:

```typescript
describe('Parser', () => {
  describe('parseConfig', () => {
    it('should parse valid configuration', () => {
      // Arrange
      const input = '{"key": "value"}';

      // Act
      const result = parseConfig(input);

      // Assert
      expect(result).toEqual({
        key: 'value',
      });
    });

    it('should throw error for invalid JSON', () => {
      // Arrange
      const input = '{invalid json}';

      // Act & Assert
      expect(() => parseConfig(input)).toThrow('Invalid JSON');
    });
  });
});
```

## Continuous Integration

Tests are automatically run in the CI pipeline for:

- Pull requests
- Merges to main branch
- Release builds

The CI pipeline will fail if:

- Any tests fail
- Coverage drops below configured thresholds
- TypeScript compilation errors exist

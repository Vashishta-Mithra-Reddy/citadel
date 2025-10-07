# Contributing to Citadel

Thank you for considering contributing to Citadel! We welcome contributions from the community to help improve this password manager.

## 🤝 How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with the following information:

1. **Description**: A clear and concise description of the bug
2. **Steps to Reproduce**: Detailed steps to reproduce the issue
3. **Expected Behavior**: What you expected to happen
4. **Actual Behavior**: What actually happened
5. **Screenshots**: If applicable, add screenshots to help explain the problem
6. **Environment**: 
   - OS (Windows, macOS, Linux)
   - Browser (Chrome, Firefox, Safari, Edge)
   - Node.js version
   - Any relevant error messages from the console

### Suggesting Features

We're always looking for ways to improve Citadel. To suggest a feature:

1. Check if the feature has already been suggested
2. Create a new issue with the "enhancement" label
3. Provide a clear description of the feature and its benefits
4. Explain any use cases or scenarios where this feature would be helpful

### Pull Requests

We actively welcome your pull requests! Here's the process:

1. **Fork the Repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/citadel.git
   cd citadel
   ```

2. **Create a Branch**
   ```bash
   git checkout -b feature/YourFeatureName
   # or
   git checkout -b fix/YourBugFix
   ```

3. **Set Up Development Environment**
   ```bash
   npm install
   cp .env.example .env.local
   # Add your MongoDB URI and other environment variables
   ```

4. **Make Your Changes**
   - Write clear, concise code
   - Follow the existing code style
   - Add comments where necessary
   - Update documentation if needed

5. **Test Your Changes**
   ```bash
   npm run dev
   # Test the application thoroughly
   npm run lint
   # Fix any linting errors
   ```

6. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

   **Commit Message Guidelines:**
   - Use present tense ("Add feature" not "Added feature")
   - Use imperative mood ("Move cursor to..." not "Moves cursor to...")
   - Limit the first line to 72 characters
   - Reference issues and pull requests liberally

7. **Push to Your Fork**
   ```bash
   git push origin feature/YourFeatureName
   ```

8. **Create a Pull Request**
   - Go to the original Citadel repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Provide a clear description of your changes
   - Link any related issues

## 📝 Code Style Guidelines

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid using `any` type unless absolutely necessary
- Use meaningful variable and function names

### React Components

- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use proper prop types

### File Organization

- Place components in the `components/` directory
- Group related components in subdirectories
- Keep utility functions in `lib/` or `utils/`
- Use descriptive file names in PascalCase for components

### Styling

- Use Tailwind CSS utility classes
- Follow the existing design system
- Ensure responsive design works on all screen sizes
- Test dark mode compatibility

### Security Considerations

When contributing security-related changes:

- **Never** commit sensitive data (API keys, passwords, etc.)
- Ensure encryption/decryption happens client-side only
- Follow best practices for authentication
- Don't weaken existing security measures
- Document any security implications of your changes

## 🧪 Testing

Currently, Citadel doesn't have an automated test suite. When adding new features:

1. Manually test all functionality
2. Test in multiple browsers
3. Verify responsive design
4. Check dark/light mode
5. Test error handling

We welcome contributions to add automated testing!

## 🔍 Code Review Process

1. All submissions require review before being merged
2. Reviewers may request changes or improvements
3. Address feedback promptly and professionally
4. Once approved, a maintainer will merge your PR

## 🌟 First Time Contributors

New to open source? Here are some good first issues to get started:

- Documentation improvements
- UI/UX enhancements
- Bug fixes
- Adding tests
- Performance optimizations

Look for issues tagged with `good first issue` or `help wanted`.

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please be respectful and constructive in your interactions.

### Expected Behavior

- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy toward other community members

### Unacceptable Behavior

- Harassment or discriminatory language
- Trolling or insulting comments
- Publishing others' private information
- Other conduct which could reasonably be considered inappropriate

## 📞 Questions?

If you have questions about contributing, feel free to:

1. Open an issue with the "question" label
2. Reach out to the maintainers
3. Check existing documentation and issues

## 🙏 Thank You!

Your contributions make Citadel better for everyone. We appreciate your time and effort!

---

**Happy Contributing! 🚀**

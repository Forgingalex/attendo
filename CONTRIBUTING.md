# Contributing to Attendo

Thank you for your interest in contributing to Attendo! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Be patient and understanding

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/attendo.git`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Commit your changes: `git commit -m "Add: your feature description"`
6. Push to your fork: `git push origin feature/your-feature-name`
7. Open a Pull Request

## Development Setup

### Prerequisites

- Node.js 20+
- PostgreSQL 16+ (or use SQLite for quick testing)
- Docker (optional, for containerized development)

### Setup Steps

1. **Install dependencies:**
   ```bash
   # Backend
   cd server
   npm install
   
   # Frontend
   cd ../client
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   # Copy .env.example to .env in server directory
   cd server
   cp .env.example .env
   # Edit .env with your database credentials
   ```

3. **Set up database:**
   ```bash
   cd server
   npm run prisma:generate
   npm run prisma:migrate
   ```

4. **Start development servers:**
   ```bash
   # Terminal 1 - Backend
   cd server
   npm run dev
   
   # Terminal 2 - Frontend
   cd client
   npm run dev
   ```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Avoid `any` types - use proper type definitions
- Follow existing code style and patterns

### Code Style

- Use 2 spaces for indentation
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions focused and small

### Commit Messages

Follow conventional commits format:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Example:
```
feat: Add search functionality to sign out page
fix: Resolve database connection timeout issue
docs: Update API documentation
```

## Project Structure

```
attendo/
├── client/          # React frontend
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/      # Page components
│   │   ├── services/   # API services
│   │   └── ...
│   └── ...
├── server/          # Express backend
│   ├── src/
│   │   ├── config/     # Configuration
│   │   ├── middleware/ # Express middleware
│   │   ├── routes/     # API routes
│   │   └── utils/      # Utilities
│   ├── prisma/      # Database schema
│   └── ...
└── ...
```

## Pull Request Process

1. **Update your branch:**
   ```bash
   git checkout main
   git pull upstream main
   git checkout your-branch
   git rebase main
   ```

2. **Test your changes:**
   - Ensure all tests pass
   - Test manually in development
   - Check for linting errors

3. **Write a clear PR description:**
   - What changes were made
   - Why the changes were needed
   - How to test the changes
   - Screenshots (if UI changes)

4. **Wait for review:**
   - Address any feedback
   - Make requested changes
   - Keep the PR focused and small

## Areas for Contribution

- 🐛 Bug fixes
- ✨ New features
- 📝 Documentation improvements
- 🎨 UI/UX enhancements
- ⚡ Performance optimizations
- 🧪 Tests
- 🌐 Internationalization
- ♿ Accessibility improvements

## Questions?

Feel free to open an issue for questions or discussions about contributions.

Thank you for contributing to Attendo! 🎉


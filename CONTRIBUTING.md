# Contributing to OpenChat UI

Thank you for considering contributing to OpenChat UI! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## How to Contribute

### Reporting Bugs

Bugs are tracked as GitHub issues. Create an issue and provide the following information:

- A clear and descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Any additional context

### Suggesting Enhancements

Enhancement suggestions are also tracked as GitHub issues. Provide the following information:

- A clear and descriptive title
- A detailed description of the suggested enhancement
- Explain why this enhancement would be useful
- Provide examples of how it would be used

### Pull Requests

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Development Setup

1. Clone the repository
2. Install dependencies with `npm install`
3. Create a `.env.local` file with your OpenRouter API key
4. Start the development server with `npm run dev`

### Code Style

- Follow the existing code style
- Use meaningful variable and function names
- Write comments for complex logic
- Use TypeScript types appropriately

## Project Structure

- `/src/app` - Next.js app router pages
- `/src/components` - React components
- `/src/components/ui` - UI components
- `/src/config` - Configuration files
- `/src/hooks` - Custom React hooks
- `/src/lib` - Utility functions

## Customization

The project is designed to be easily customizable. The main configuration file is located at `/src/config/chat-config.ts`. You can modify this file to change the appearance and behavior of the chat interface.

## License

By contributing to OpenChat UI, you agree that your contributions will be licensed under the project's MIT License.
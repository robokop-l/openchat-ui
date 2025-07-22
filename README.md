# OpenChat UI

A modern, responsive chat interface for AI interactions built with Next.js. This project provides a clean, user-friendly interface for interacting with AI models through the OpenRouter API.
<img width="1470" height="920" alt="home screen" src="https://github.com/user-attachments/assets/def953fd-f33f-4517-ac56-7d99307bf59d" />

<img width="1470" height="920" alt="conversation" src="https://github.com/user-attachments/assets/e1800fc1-89bc-4679-a08e-8e34a0c2bce0" />

## Features

- Clean, modern UI inspired by popular chat applications
- Real-time streaming responses with typewriter effect
- Markdown support for AI responses
- Responsive design that works on desktop and mobile
- Dark mode interface
- Message history within the session
- Ability to stop AI responses mid-generation

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- An OpenRouter API key

### Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_OPENROUTER_API_KEY=your_openrouter_api_key
NEXT_PUBLIC_OPENROUTER_MODEL=your_preferred_model_id
```

### Installation

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Development

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Customization

You can customize the UI by modifying the components in the `src/components/ui` directory. The main chat interface is in `src/app/page.tsx`.

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [React](https://reactjs.org/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [OpenRouter API](https://openrouter.ai/) - AI model access
- [React Markdown](https://github.com/remarkjs/react-markdown) - Markdown rendering

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by modern chat interfaces
- Built with the Next.js App Router

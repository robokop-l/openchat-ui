# OpenChat UI

A customizable, open-source chat interface for AI language models. This project provides a clean, modern UI for interacting with various AI models through the OpenRouter API.

## Features

- 🚀 Modern, responsive UI built with Next.js and Tailwind CSS
- 💬 Real-time streaming responses with typewriter effect
- 🔄 Markdown rendering for AI responses
- 🌓 Dark mode by default (light mode coming soon)
- 🛠️ Easily customizable components and styling
- 🔌 Ready to use with OpenRouter API (supports multiple models)

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- An OpenRouter API key ([Get one here](https://openrouter.ai/))

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/openchat-ui.git
cd openchat-ui
```

2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a `.env.local` file in the root directory and add your OpenRouter API key

```
NEXT_PUBLIC_OPENROUTER_API_KEY=your_openrouter_api_key_here
NEXT_PUBLIC_OPENROUTER_MODEL=deepseek/deepseek-chat-v3-0324:free
```

4. Start the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Customization

### Changing the AI Model

You can change the AI model by updating the `NEXT_PUBLIC_OPENROUTER_MODEL` in your `.env.local` file. OpenRouter supports various models including:

- `anthropic/claude-3-opus:beta`
- `meta-llama/llama-3-70b-instruct:nitro`
- `google/gemini-1.5-pro-latest`
- `deepseek/deepseek-chat-v3-0324:free`

Check the [OpenRouter documentation](https://openrouter.ai/docs) for a full list of supported models.

### Styling

The UI is built with Tailwind CSS and can be easily customized by modifying the Tailwind configuration in `tailwind.config.ts` and the component styles.

### Components

The main components are located in the `src/components/ui` directory and can be modified to suit your needs:

- `chat-input.tsx` - The chat input component
- `response-stream.tsx` - The streaming response component with typewriter effect
- `button.tsx` - Button component
- `textarea.tsx` - Textarea component

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Powered by [OpenRouter](https://openrouter.ai/)

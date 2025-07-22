/**
 * Configuration options for the chat interface
 * You can customize these values to change the appearance and behavior of the chat
 */

export const chatConfig = {
  // UI Configuration
  ui: {
    // Colors (Tailwind classes)
    colors: {
      background: "bg-[#202124]",
      text: "text-[#E8EAED]",
      inputBackground: "bg-[#303134]",
      inputText: "text-[#E8EAED]",
      inputPlaceholder: "text-[#80868B]",
      buttonBackground: "bg-[#F1F3F4]",
      buttonText: "text-[#202124]",
      buttonHover: "hover:bg-[#E8EAED]",
      userMessageBackground: "bg-[#303134]",
      userMessageText: "text-[#E8EAED]",
      aiMessageBackground: "bg-transparent",
      aiMessageText: "text-[#E8EAED]",
    },
    // Text content
    text: {
      landingTitle: "What can I help with?",
      inputPlaceholder: "Ask anything",
      loadingText: "Typing...",
      errorMessage: "Sorry, I couldn't connect to the AI. Please try again.",
    },
  },
  
  // API Configuration
  api: {
    // Default endpoint (can be overridden by environment variable)
    endpoint: "https://openrouter.ai/api/v1/chat/completions",
    // Default model (can be overridden by environment variable)
    defaultModel: "deepseek/deepseek-chat-v3-0324:free",
    // Stream responses
    stream: true,
  },
  
  // Response Configuration
  response: {
    // Default mode for response streaming
    defaultMode: "typewriter", // "typewriter" or "fade"
    // Default speed for response streaming (1-100)
    defaultSpeed: 20,
  },
};
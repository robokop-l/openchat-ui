"use client";

import {
	ChatInput,
	ChatInputSubmit,
	ChatInputTextArea,
} from "@/components/ui/chat-input";
import { useState } from "react";
import { toast, Toaster } from "sonner";
import ReactMarkdown from 'react-markdown';
import { ShiningText } from "@/components/ui/shining-text";
import { ResponseStream } from "@/components/ui/response-stream"; // Added import
import { Bell, Home as HomeIcon, HelpCircle, Settings, Shield, Mail } from "lucide-react";

interface Message {
	id: string;
	text: string;
	sender: "user" | "ai";
	timestamp: Date;
}

export default function Home() {
	const [value, setValue] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isReceivingStream, setIsReceivingStream] = useState(false); // New state for stream status
	const [abortController, setAbortController] = useState<AbortController | null>(null);
	const [messages, setMessages] = useState<Message[]>([]);
	const [currentView, setCurrentView] = useState<"landing" | "chat">("landing");
	const [lastUserMessage, setLastUserMessage] = useState<string>(""); // New state to store last user message



	const handleSubmit = () => {
		if (!value.trim() || isLoading) return;

		const userMessage: Message = {
			id: Date.now().toString(),
			text: value,
			sender: "user",
			timestamp: new Date(),
		};

		setMessages(prev => [...prev, userMessage]);
		setLastUserMessage(value); // Store the current user input
		setValue("");
		setIsLoading(true);
		setIsReceivingStream(false); // Reset stream status for new message
		const controller = new AbortController();
		setAbortController(controller);
		let aiMessageId: string | null = null; // Declare aiMessageId in a higher scope

		// Switch to chat view if on landing
		if (currentView === "landing") {
			setCurrentView("chat");
		}

		// API Key and Model are now read from environment variables
		const OPENROUTER_API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
		const OPENROUTER_MODEL = process.env.NEXT_PUBLIC_OPENROUTER_MODEL || "deepseek/deepseek-chat-v3-0324:free";

		fetch("https://openrouter.ai/api/v1/chat/completions", {
			signal: controller.signal, // Pass the abort signal to fetch
			method: "POST",
			headers: {
				"Authorization": `Bearer ${OPENROUTER_API_KEY}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				model: OPENROUTER_MODEL,
				messages: [{ role: "user", content: userMessage.text }],
				stream: true, // Enable streaming
			}),
		})
			.then(async response => {
				if (!response.ok) {
					const errorData = await response.json().catch(() => ({ error: { message: "API request failed with no error details." } }));
					throw new Error(errorData.error?.message || "API request failed");
				}

				const reader = response.body?.getReader();
				if (!reader) {
					throw new Error("Failed to get response reader.");
				}

				const decoder = new TextDecoder();
				let accumulatedContent = "";
				aiMessageId = (Date.now() + 1).toString(); // Assign value to aiMessageId

				// Add a placeholder message for the AI response
				setMessages(prev => [...prev, { id: aiMessageId as string, text: "", sender: "ai", timestamp: new Date() }]);

				while (true) {
					const { done, value } = await reader.read();
					if (done) break;

					const chunk = decoder.decode(value, { stream: true });
					// Process server-sent events (SSE)
					const lines = chunk.split("\n");
					for (const line of lines) {
						if (line.startsWith("data: ")) {
							const dataStr = line.substring(6);
							if (dataStr === "[DONE]") {
								return; // Stream finished
							}
							try {
								const jsonData = JSON.parse(dataStr);
								const deltaContent = jsonData.choices?.[0]?.delta?.content;
								if (deltaContent) {
									if (!isReceivingStream) {
										setIsReceivingStream(true); // Set stream status on first token
									}
									accumulatedContent += deltaContent;
									setMessages(prevMessages =>
										prevMessages.map(msg =>
											msg.id === aiMessageId ? { ...msg, text: accumulatedContent } : msg
										)
									);
								}
							} catch (e) {
								// อาจจะมี chunk ที่ไม่สมบูรณ์ หรือไม่ใช่ JSON ที่ถูกต้อง, ให้ข้ามไปก่อน
								console.warn("Could not parse stream data chunk:", dataStr, e);
							}
						}
					}
				}
			})
			.catch(error => {
				if (error.name === 'AbortError') {
					console.log('Fetch aborted by user');
				} else {
					console.error("Error calling OpenRouter API:", error);
					toast.error(`Error: ${error.message || "Failed to get AI response."}`);
					const errorMessage: Message = {
						id: (Date.now() + 1).toString(),
						text: "Sorry, I couldn't connect to the AI. Please try again.",
						sender: "ai",
						timestamp: new Date(),
					};
					setMessages(prev => [...prev, errorMessage]);
				}
			})
			.finally(() => {
				setIsLoading(false);
				setIsReceivingStream(false); // Reset stream status on completion/error
			});
	};

	const handleStop = () => {
		if (abortController) {
			abortController.abort();
			setAbortController(null);
		}
		setIsLoading(false);
		// If stopped before receiving any stream, remove the AI's placeholder message and restore user's input
		if (!isReceivingStream) {
			setMessages(prev => prev.slice(0, -1)); // Remove the last (AI placeholder) message
			setValue(lastUserMessage); // Restore user's last input
		}
		setIsReceivingStream(false);
	};

	return (
		<div className="h-screen bg-[#202124] text-[#E8EAED] flex flex-col">
			{currentView === "landing" ? (
				<div className="flex-1 flex flex-col">
					{/* Landing View */}
					{/* Main content area */}
					<div className="flex-1 flex flex-col items-center justify-center p-5">
						<h1 className="text-4xl font-medium mb-7 text-center">
							What can I help with?
						</h1>
						<div className="w-full max-w-[600px]">
							<ChatInput
								variant="default"
								value={value}
								onChange={(e) => setValue(e.target.value)}
								onSubmit={handleSubmit}
								loading={isLoading}
								onStop={handleStop}
								className="bg-[#303134] border-none rounded-[28px] p-2"
							>
								<ChatInputTextArea 
									placeholder="Ask anything" 
									className="bg-transparent text-[#E8EAED] placeholder:text-[#80868B] border-none focus-visible:ring-0 text-base h-12 resize-none"
									rows={1}
								/>
								<ChatInputSubmit className="bg-[#F1F3F4] text-[#202124] hover:bg-[#E8EAED] border-none w-10 h-10 rounded-full" />
							</ChatInput>
						</div>
					</div>
				</div>
			) : (
				<>
					{/* Chat View */}
					{/* Messages Container */}
					<div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-4 max-w-[800px] mx-auto w-full">
						{messages.map((message) => (
							<div
								key={message.id}
								className={`max-w-[75%] p-4 rounded-[20px] text-[15px] leading-6 break-words ${
									message.sender === "user"
										? "bg-[#303134] text-[#E8EAED] self-end rounded-br-[6px]"
										: "bg-transparent text-[#E8EAED] self-start"
								}`}
							>
								{message.sender === "user" ? (
									message.text
								) : isReceivingStream && messages[messages.length -1].id === message.id ? (
									<ResponseStream textStream={message.text} />
								) : (
									<div className="whitespace-pre-wrap">
										<ReactMarkdown>{message.text}</ReactMarkdown>
									</div>
								)}
							</div>
						))} 
						{isLoading && !isReceivingStream && (
							<ShiningText text="Typing..." />
						)}
					</div>
					
					{/* Input Area */}
					<div className="p-5 flex justify-center">
						<div className="w-full max-w-[760px]">
							<ChatInput
								variant="default"
								value={value}
								onChange={(e) => setValue(e.target.value)}
								onSubmit={handleSubmit}
								loading={isLoading}
								onStop={handleStop}
								className="bg-[#303134] border-none rounded-[28px] p-2"
							>
								<ChatInputTextArea 
									placeholder="Ask anything" 
									className="bg-transparent text-[#E8EAED] placeholder:text-[#80868B] border-none focus-visible:ring-0 text-base h-12 resize-none"
									rows={1}
								/>
								<ChatInputSubmit className="bg-[#F1F3F4] text-[#202124] hover:bg-[#E8EAED] border-none w-10 h-10 rounded-full" />
							</ChatInput>
						</div>
					</div>
				</>
			)}
			<Toaster />
		</div>
	);
}
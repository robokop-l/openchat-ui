"use client";

import {
	ChatInput,
	ChatInputSubmit,
	ChatInputTextArea,
} from "@/components/ui/chat-input";
import { useState } from "react";
import { toast, Toaster } from "sonner"; // Added Toaster

export default function ChatInputDemoPage() { // Changed to default export and named as a page component
	const [value, setValue] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = () => {
		setIsLoading(true);
		setTimeout(() => {
			toast(`Message submitted: ${value}`); // Made toast message more descriptive
			setValue(""); // Clear input after submit
			setIsLoading(false);
		}, 1000);
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-4">
			<h1 className="text-2xl font-bold mb-4">Chat Input Demo</h1>
			<div className="w-full max-w-[400px]">
				<ChatInput
					variant="default"
					value={value}
					onChange={(e) => setValue(e.target.value)}
					onSubmit={handleSubmit}
					loading={isLoading}
					onStop={() => setIsLoading(false)}
				>
					<ChatInputTextArea placeholder="Type a message..." />
					<ChatInputSubmit />
				</ChatInput>
			</div>
			<Toaster /> {/* Added Toaster component for notifications */}
		</div>
	);
}
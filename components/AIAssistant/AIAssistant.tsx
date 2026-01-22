"use client";

import { MessageCircleQuestionMark, X, Send, Bot, User } from "lucide-react";
import React, { useState, useRef, useEffect, useCallback, memo, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Message {
	id: string;
	role: "user" | "assistant";
	content: string;
	timestamp: Date;
}

interface StreamingTextProps {
	streamingRef: React.RefObject<string | null>;
}

interface TypingTextProps {
	text: string;
	onComplete?: () => void;
}

// Optimized TypingText component with proper cleanup
const TypingText = memo(({ text, onComplete }: TypingTextProps) => {
	const [displayText, setDisplayText] = useState("");
	const currentIndexRef = useRef(0);
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (!text) return;

		currentIndexRef.current = 0;
		let mounted = true;

		const typeCharacters = () => {
			if (!mounted || currentIndexRef.current >= text.length) {
				if (mounted && currentIndexRef.current >= text.length) {
					onComplete?.();
				}
				return;
			}

			const charsToAdd = Math.min(
				Math.floor(Math.random() * 3) + 1,
				text.length - currentIndexRef.current
			);
			currentIndexRef.current += charsToAdd;

			setDisplayText(text.slice(0, currentIndexRef.current));
			timerRef.current = setTimeout(typeCharacters, 20);
		};

		// Start typing on next tick to avoid sync setState
		timerRef.current = setTimeout(typeCharacters, 0);

		return () => {
			mounted = false;
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}
		};
	}, [text, onComplete]);

	return <>{displayText}</>;
});

TypingText.displayName = "TypingText";

// Optimized StreamingText component
const StreamingText = memo(({ streamingRef }: StreamingTextProps) => {
	const [displayText, setDisplayText] = useState("");
	const animationRef = useRef<number | null>(null);
	const lastUpdateRef = useRef<number>(0);
	const currentIndexRef = useRef(0);

	useEffect(() => {
		const animate = (timestamp: number) => {
			if (timestamp - lastUpdateRef.current < 30) {
				animationRef.current = requestAnimationFrame(animate);
				return;
			}
			lastUpdateRef.current = timestamp;

			const targetText = streamingRef.current || "";

			if (currentIndexRef.current < targetText.length) {
				const charsToAdd = Math.min(
					Math.random() > 0.5 ? 2 : 1,
					targetText.length - currentIndexRef.current
				);
				currentIndexRef.current += charsToAdd;
				setDisplayText(targetText.slice(0, currentIndexRef.current));
			} else if (targetText !== displayText && targetText.length <= currentIndexRef.current) {
				setDisplayText(targetText);
				currentIndexRef.current = targetText.length;
			}

			animationRef.current = requestAnimationFrame(animate);
		};

		animationRef.current = requestAnimationFrame(animate);

		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
		};
	}, [streamingRef, displayText]);

	return <>{displayText}</>;
});

StreamingText.displayName = "StreamingText";

const getOrCreateUserId = (): string => {
	if (typeof window === "undefined") {
		return `temp-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
	}

	const storageKey = "ai_assistant_user_id";
	let userId = localStorage.getItem(storageKey);

	if (!userId) {
		userId = `user-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
		localStorage.setItem(storageKey, userId);
	}

	return userId;
};

const SUGGESTED_QUESTIONS = [
	"What projects are you working on?",
	"Tell me about your most interesting project!",
	"Do you have AWS certification?",
	"How can I contact you?",
] as const;

const WELCOME_MESSAGE =
	"Hi there! I'm Hung 👋\n\nLooking to learn more about my portfolio? Feel free to ask me anything - I'm happy to share about my experience, projects, or anything you're curious about! 😊";

const ERROR_MESSAGES = {
	default: "Sorry, I couldn't answer that question.",
	generic:
		"Sorry, something went wrong while processing your request. Please try again later.",
} as const;

// Memoized Message Component
const MessageBubble = memo(({
	message,
	isStreaming,
	isTyping,
	streamingContentRef,
	onTypingComplete,
}: {
	message: Message;
	isStreaming: boolean;
	isTyping: boolean;
	streamingContentRef: React.RefObject<string | null>;
	onTypingComplete: () => void;
}) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			className={cn(
				"flex gap-3",
				message.role === "user" ? "justify-end" : "justify-start"
			)}
		>
			{message.role === "assistant" && (
				<div
					className={cn(
						"shrink-0 h-8 w-8 rounded-full",
						"bg-primary/10 text-primary",
						"flex items-center justify-center"
					)}
				>
					<Bot className="h-4 w-4" />
				</div>
			)}
			<div
				className={cn(
					"max-w-[80%] rounded-lg px-4 py-2 text-sm",
					message.role === "user"
						? "bg-primary text-primary-foreground"
						: "bg-muted text-muted-foreground"
				)}
			>
				<p className="whitespace-pre-wrap wrap-break-word">
					{isStreaming ? (
						<StreamingText streamingRef={streamingContentRef} />
					) : isTyping && message.role === "assistant" ? (
						<TypingText
							key={message.id}
							text={message.content}
							onComplete={onTypingComplete}
						/>
					) : (
						message.content
					)}
				</p>
				<span
					className={cn(
						"text-xs mt-1 block",
						message.role === "user"
							? "text-primary-foreground/70"
							: "text-muted-foreground/70"
					)}
				>
					{message.timestamp.toLocaleTimeString("en-US", {
						hour: "2-digit",
						minute: "2-digit",
					})}
				</span>
			</div>
			{message.role === "user" && (
				<div
					className={cn(
						"shrink-0 h-8 w-8 rounded-full",
						"bg-primary/10 text-primary",
						"flex items-center justify-center"
					)}
				>
					<User className="h-4 w-4" />
				</div>
			)}
		</motion.div>
	);
});

MessageBubble.displayName = "MessageBubble";

const AIAssistant = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState<Message[]>([
		{
			id: "1",
			role: "assistant",
			content: WELCOME_MESSAGE,
			timestamp: new Date(),
		},
	]);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);
	const [typingMessageId, setTypingMessageId] = useState<string | null>(null);

	const streamingContentRef = useRef<string | null>("");
	const [userId] = useState<string>(() => getOrCreateUserId());
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const messagesContainerRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLTextAreaElement>(null);
	const shouldAutoScrollRef = useRef(true);
	const isSubmittingRef = useRef(false);

	const scrollToBottom = useCallback(() => {
		if (!shouldAutoScrollRef.current || !messagesEndRef.current) return;
		messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
	}, []);

	// Scroll detection - memoized handler
	const handleScroll = useCallback(() => {
		const container = messagesContainerRef.current;
		if (!container) return;

		const { scrollTop, scrollHeight, clientHeight } = container;
		const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
		shouldAutoScrollRef.current = distanceFromBottom < 50;
	}, []);

	useEffect(() => {
		const container = messagesContainerRef.current;
		if (!container) return;

		container.addEventListener("scroll", handleScroll, { passive: true });
		return () => container.removeEventListener("scroll", handleScroll);
	}, [handleScroll]);

	// Optimized MutationObserver - only observe childList changes
	useEffect(() => {
		const container = messagesContainerRef.current;
		if (!container) return;

		const observer = new MutationObserver(() => {
			if (shouldAutoScrollRef.current) {
				scrollToBottom();
			}
		});

		observer.observe(container, {
			childList: true,
			subtree: true,
		});

		return () => observer.disconnect();
	}, [scrollToBottom]);

	// Scroll on new messages
	useEffect(() => {
		shouldAutoScrollRef.current = true;
		scrollToBottom();
	}, [messages.length, scrollToBottom]);

	// Focus input when opened
	useEffect(() => {
		if (isOpen && inputRef.current) {
			const timeoutId = setTimeout(() => {
				inputRef.current?.focus({ preventScroll: true });
			}, 400);
			return () => clearTimeout(timeoutId);
		}
	}, [isOpen]);

	const sendMessage = useCallback(
		async (prompt: string) => {
			const messageId = (Date.now() + 1).toString();
			const messageTimestamp = new Date();

			setStreamingMessageId(messageId);
			streamingContentRef.current = "";

			const assistantMessage: Message = {
				id: messageId,
				role: "assistant",
				content: "",
				timestamp: messageTimestamp,
			};
			setMessages((prev) => [...prev, assistantMessage]);

			try {
				const response = await fetch("/api/ai", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ prompt, userId }),
				});

				if (!response.ok) {
					const data = await response.json();
					throw new Error(data.error || "Failed to get AI response");
				}

				const reader = response.body?.getReader();
				const decoder = new TextDecoder();

				if (!reader) throw new Error("No response body");

				let fullContent = "";

				while (true) {
					const { done, value } = await reader.read();
					if (done) break;

					const chunk = decoder.decode(value);
					const lines = chunk.split("\n");

					for (const line of lines) {
						if (line.startsWith("data: ")) {
							const data = line.slice(6);
							if (data === "[DONE]") break;
							try {
								const parsed = JSON.parse(data);
								if (parsed.text) {
									fullContent += parsed.text;
									streamingContentRef.current = fullContent;
								}
							} catch {
								/* ignore parse errors */
							}
						}
					}
				}

				const finalContent = fullContent || ERROR_MESSAGES.default;
				setMessages((prev) =>
					prev.map((msg) =>
						msg.id === messageId ? { ...msg, content: finalContent } : msg
					)
				);
				setStreamingMessageId(null);
				setTypingMessageId(messageId);
				streamingContentRef.current = "";
			} catch (error) {
				console.error("Error calling AI API:", error);
				const errorContent =
					error instanceof Error && error.message.includes("limit")
						? error.message
						: ERROR_MESSAGES.generic;

				setMessages((prev) =>
					prev.map((msg) =>
						msg.id === messageId ? { ...msg, content: errorContent } : msg
					)
				);
				setStreamingMessageId(null);
				setTypingMessageId(messageId);
				streamingContentRef.current = "";
			}
		},
		[userId]
	);

	const handleSend = useCallback(() => {
		if (!input.trim() || isLoading) return;

		const userPrompt = input.trim();
		const userMessage: Message = {
			id: Date.now().toString(),
			role: "user",
			content: userPrompt,
			timestamp: new Date(),
		};

		// Set flag to prevent onChange from interfering
		isSubmittingRef.current = true;

		// Clear input immediately and reset textarea height
		setInput("");
		if (inputRef.current) {
			inputRef.current.value = "";
			inputRef.current.style.height = "auto";
		}

		// Reset flag after state update
		setTimeout(() => {
			isSubmittingRef.current = false;
		}, 0);

		setMessages((prev) => [...prev, userMessage]);
		setIsLoading(true);

		sendMessage(userPrompt).finally(() => {
			setIsLoading(false);
		});
	}, [input, isLoading, sendMessage]);

	const handleKeyPress = useCallback(
		(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
			if (e.key === "Enter" && !e.shiftKey) {
				e.preventDefault();
				handleSend();
			}
		},
		[handleSend]
	);

	const handleSuggestionClick = useCallback(
		(question: string) => {
			if (isLoading) return;

			const userMessage: Message = {
				id: Date.now().toString(),
				role: "user",
				content: question,
				timestamp: new Date(),
			};

			setMessages((prev) => [...prev, userMessage]);
			setIsLoading(true);

			sendMessage(question).finally(() => {
				setIsLoading(false);
			});
		},
		[isLoading, sendMessage]
	);

	const handleInputChange = useCallback(
		(e: React.ChangeEvent<HTMLTextAreaElement>) => {
			// Ignore onChange events while submitting
			if (isSubmittingRef.current) return;

			const newValue = e.target.value;
			setInput(newValue);

			// Handle resize inline to avoid stale closure issues
			const target = e.target;
			target.style.height = "auto";
			target.style.height = `${Math.min(target.scrollHeight, 128)}px`;
		},
		[]
	);

	const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), []);
	const closeChat = useCallback(() => setIsOpen(false), []);
	const handleTypingComplete = useCallback(() => setTypingMessageId(null), []);

	const showSuggestions = useMemo(
		() => messages.length <= 3 && !isLoading,
		[messages.length, isLoading]
	);

	return (
		<>
			<motion.button
				onClick={toggleOpen}
				className={cn(
					"fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-50",
					"h-14 w-14 rounded-full",
					"bg-primary text-primary-foreground",
					"flex items-center justify-center",
					"shadow-lg hover:shadow-xl",
					"transition-shadow duration-200",
					"focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
				)}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.95 }}
				animate={{ rotate: isOpen ? 180 : 0 }}
				transition={{ type: "spring", stiffness: 300, damping: 20 }}
				aria-label="Toggle AI Assistant"
			>
				<AnimatePresence mode="wait">
					{isOpen ? (
						<motion.div
							key="close"
							initial={{ rotate: -90, opacity: 0 }}
							animate={{ rotate: 0, opacity: 1 }}
							exit={{ rotate: 90, opacity: 0 }}
							transition={{ duration: 0.2 }}
						>
							<X className="h-6 w-6" />
						</motion.div>
					) : (
						<motion.div
							key="open"
							initial={{ rotate: 90, opacity: 0 }}
							animate={{ rotate: 0, opacity: 1 }}
							exit={{ rotate: -90, opacity: 0 }}
							transition={{ duration: 0.2 }}
						>
							<MessageCircleQuestionMark className="h-6 w-6" />
						</motion.div>
					)}
				</AnimatePresence>
			</motion.button>

			<AnimatePresence>
				{isOpen && (
					<>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40"
							onClick={closeChat}
						/>

						<motion.div
							initial={{ opacity: 0, scale: 0.8, y: 20 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.8, y: 20 }}
							transition={{ type: "spring", stiffness: 300, damping: 30 }}
							className={cn(
								"fixed bottom-28 right-6 sm:bottom-32 sm:right-10 z-50",
								"w-[calc(100vw-3rem)] sm:w-full max-w-lg",
								"h-[calc(100vh-9rem)] sm:h-[700px] sm:max-h-[85vh]",
								"flex flex-col",
								"bg-card border border-border rounded-lg",
								"shadow-2xl overflow-hidden"
							)}
						>
							<div
								className={cn(
									"flex items-center justify-between",
									"px-4 py-3",
									"bg-primary text-primary-foreground",
									"border-b border-border"
								)}
							>
								<div className="flex items-center gap-2">
									<Bot className="h-5 w-5" />
									<h3 className="font-semibold text-sm sm:text-base">
										AI Assistant
									</h3>
								</div>
								<Button
									variant="ghost"
									size="icon"
									onClick={closeChat}
									className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
								>
									<X className="h-4 w-4" />
								</Button>
							</div>

							<div
								ref={messagesContainerRef}
								className={cn(
									"flex-1 overflow-y-auto overflow-x-hidden",
									"px-4 py-4",
									"space-y-4",
									"scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
								)}
								style={{ overscrollBehavior: "contain" }}
							>
								{messages.map((message) => {
									const isStreaming = message.id === streamingMessageId;
									const isTyping = message.id === typingMessageId;
									const hasContent = message.content || streamingContentRef.current;

									if (isStreaming && !hasContent) {
										return null;
									}

									return (
										<MessageBubble
											key={message.id}
											message={message}
											isStreaming={isStreaming}
											isTyping={isTyping}
											streamingContentRef={streamingContentRef}
											onTypingComplete={handleTypingComplete}
										/>
									);
								})}

								{isLoading && (
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										className="flex gap-3 justify-start"
									>
										<div
											className={cn(
												"shrink-0 h-8 w-8 rounded-full",
												"bg-primary/10 text-primary",
												"flex items-center justify-center"
											)}
										>
											<Bot className="h-4 w-4" />
										</div>
										<div className="bg-muted text-muted-foreground rounded-lg px-4 py-2">
											<div className="flex gap-1">
												{[0, 0.2, 0.4].map((delay, i) => (
													<motion.div
														key={i}
														className="h-2 w-2 bg-muted-foreground rounded-full"
														animate={{ y: [0, -8, 0] }}
														transition={{
															duration: 0.6,
															repeat: Infinity,
															delay,
														}}
													/>
												))}
											</div>
										</div>
									</motion.div>
								)}

								{showSuggestions && (
									<motion.div
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.3, delay: 0.2 }}
										className={cn(
											"mt-4 p-4 rounded-lg bg-muted/30 border border-border/50",
											"flex flex-wrap gap-2"
										)}
									>
										<span className="text-xs text-muted-foreground w-full mb-1 font-medium">
											Suggested questions:
										</span>
										{SUGGESTED_QUESTIONS.map((question, index) => (
											<motion.button
												key={index}
												onClick={() => handleSuggestionClick(question)}
												whileHover={{ scale: 1.05 }}
												whileTap={{ scale: 0.95 }}
												className={cn(
													"px-3 py-1.5 rounded-full text-xs",
													"bg-background hover:bg-muted text-muted-foreground hover:text-foreground",
													"border border-border/50",
													"transition-colors duration-200 cursor-pointer"
												)}
											>
												{question}
											</motion.button>
										))}
									</motion.div>
								)}

								<div ref={messagesEndRef} />
							</div>

							<div className={cn("border-t border-border p-4", "bg-card")}>
								<div className="flex gap-2 items-end">
									<textarea
										ref={inputRef}
										value={input}
										onChange={handleInputChange}
										onKeyDown={handleKeyPress}
										placeholder="Type your question..."
										rows={1}
										className={cn(
											"flex-1 resize-none",
											"px-3 py-2",
											"bg-background border border-input rounded-md",
											"text-base",
											"focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0",
											"placeholder:text-muted-foreground",
											"max-h-32 overflow-y-auto"
										)}
										style={{ minHeight: "40px", maxHeight: "128px" }}
									/>
									<Button
										onClick={handleSend}
										disabled={!input.trim() || isLoading}
										size="icon"
										className="h-10 w-10 shrink-0"
									>
										<Send className="h-4 w-4" />
									</Button>
								</div>
								<p className="text-xs text-muted-foreground mt-2 text-center">
									Press Enter to send, Shift + Enter for new line
								</p>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	);
};

export default AIAssistant;

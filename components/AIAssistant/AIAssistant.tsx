"use client";

import { MessageCircleQuestionMark, X, Send, Bot, User } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Message {
	id: string;
	role: "user" | "assistant";
	content: string;
	timestamp: Date;
}

// Helper function để lấy hoặc tạo userId
const getOrCreateUserId = (): string => {
	if (typeof window === "undefined") {
		// Server-side: tạo temporary ID
		return `temp-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
	}

	const storageKey = "ai_assistant_user_id";
	let userId = localStorage.getItem(storageKey);

	if (!userId) {
		// Tạo userId mới nếu chưa có
		userId = `user-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
		localStorage.setItem(storageKey, userId);
	}

	return userId;
};

const SUGGESTED_QUESTIONS = [
	"Bạn đang làm dự án gì hiện tại?",
	"Kể về dự án thú vị nhất đi!",
	"Bạn có chứng chỉ AWS à?",
	"Làm sao để liên hệ với bạn?",
];

const AIAssistant = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState<Message[]>([
		{
			id: "1",
			role: "assistant",
			content:
				"Chào bạn! Mình là Hưng đây 👋\n\nBạn đang tìm hiểu về portfolio của mình à? Cứ hỏi thoải mái nha, mình sẵn sàng chia sẻ về kinh nghiệm, dự án, hoặc bất cứ thứ gì bạn quan tâm! 😊",
			timestamp: new Date(),
		},
	]);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [userId] = useState<string>(() => getOrCreateUserId());
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLTextAreaElement>(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	useEffect(() => {
		if (isOpen && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isOpen]);

	const handleSend = async () => {
		if (!input.trim() || isLoading) return;

		const userPrompt = input.trim();
		const userMessage: Message = {
			id: Date.now().toString(),
			role: "user",
			content: userPrompt,
			timestamp: new Date(),
		};

		setMessages((prev) => [...prev, userMessage]);
		setInput("");
		setIsLoading(true);

		try {
			// Gọi API thực tế
			const response = await fetch("/api/ai", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					prompt: userPrompt,
					userId: userId,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Failed to get AI response");
			}

			const assistantMessage: Message = {
				id: (Date.now() + 1).toString(),
				role: "assistant",
				content: data.response || "Xin lỗi, tôi không thể trả lời câu hỏi này.",
				timestamp: new Date(),
			};

			setMessages((prev) => [...prev, assistantMessage]);
		} catch (error) {
			console.error("Error calling AI API:", error);
			const errorMessage: Message = {
				id: (Date.now() + 1).toString(),
				role: "assistant",
				content:
					"Xin lỗi, đã có lỗi xảy ra khi xử lý yêu cầu của bạn. Vui lòng thử lại sau.",
				timestamp: new Date(),
			};
			setMessages((prev) => [...prev, errorMessage]);
		} finally {
			setIsLoading(false);
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	};

	const handleSuggestionClick = async (question: string) => {
		if (isLoading) return;

		const now = new Date().getTime();
		const userMessage: Message = {
			id: now.toString(),
			role: "user",
			content: question,
			timestamp: new Date(now),
		};

		setMessages((prev) => [...prev, userMessage]);
		setIsLoading(true);

		try {
			// Gọi API thực tế
			const response = await fetch("/api/ai", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					prompt: question,
					userId: userId,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Failed to get AI response");
			}

			const assistantMessage: Message = {
				id: (now + 1).toString(),
				role: "assistant",
				content: data.response || "Xin lỗi, tôi không thể trả lời câu hỏi này.",
				timestamp: new Date(now + 1),
			};

			setMessages((prev) => [...prev, assistantMessage]);
		} catch (error) {
			console.error("Error calling AI API:", error);
			const errorMessage: Message = {
				id: (now + 1).toString(),
				role: "assistant",
				content:
					"Xin lỗi, đã có lỗi xảy ra khi xử lý yêu cầu của bạn. Vui lòng thử lại sau.",
				timestamp: new Date(now + 1),
			};
			setMessages((prev) => [...prev, errorMessage]);
		} finally {
			setIsLoading(false);
		}
	};

	// Show suggestions when there are few messages (only welcome + maybe 1-2 exchanges)
	const showSuggestions = messages.length <= 3 && !isLoading;

	return (
		<>
			{/* Floating Button */}
			<motion.button
				onClick={() => setIsOpen(!isOpen)}
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
				animate={{
					rotate: isOpen ? 180 : 0,
				}}
				transition={{
					type: "spring",
					stiffness: 300,
					damping: 20,
				}}
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

			{/* Chat Window */}
			<AnimatePresence>
				{isOpen && (
					<>
						{/* Backdrop */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40"
							onClick={() => setIsOpen(false)}
						/>

						{/* Chat Container */}
						<motion.div
							initial={{ opacity: 0, scale: 0.8, y: 20 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.8, y: 20 }}
							transition={{
								type: "spring",
								stiffness: 300,
								damping: 30,
							}}
							className={cn(
								"fixed bottom-28 right-6 sm:bottom-32 sm:right-10 z-50",
								"w-[calc(100vw-3rem)] sm:w-full max-w-lg",
								"h-[calc(100vh-9rem)] sm:h-[700px] sm:max-h-[85vh]",
								"flex flex-col",
								"bg-card border border-border rounded-lg",
								"shadow-2xl",
								"overflow-hidden"
							)}
						>
							{/* Header */}
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
									onClick={() => setIsOpen(false)}
									className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
								>
									<X className="h-4 w-4" />
								</Button>
							</div>

							{/* Messages Area */}
							<div
								className={cn(
									"flex-1 overflow-y-auto",
									"px-4 py-4",
									"space-y-4",
									"scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
								)}
							>
								{messages.map((message) => (
									<motion.div
										key={message.id}
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
													"shrink-0",
													"h-8 w-8 rounded-full",
													"bg-primary/10 text-primary",
													"flex items-center justify-center"
												)}
											>
												<Bot className="h-4 w-4" />
											</div>
										)}
										<div
											className={cn(
												"max-w-[80%] rounded-lg px-4 py-2",
												"text-sm",
												message.role === "user"
													? "bg-primary text-primary-foreground"
													: "bg-muted text-muted-foreground"
											)}
										>
											<p className="whitespace-pre-wrap wrap-break-word">
												{message.content}
											</p>
											<span
												className={cn(
													"text-xs mt-1 block",
													message.role === "user"
														? "text-primary-foreground/70"
														: "text-muted-foreground/70"
												)}
											>
												{message.timestamp.toLocaleTimeString("vi-VN", {
													hour: "2-digit",
													minute: "2-digit",
												})}
											</span>
										</div>
										{message.role === "user" && (
											<div
												className={cn(
													"shrink-0",
													"h-8 w-8 rounded-full",
													"bg-primary/10 text-primary",
													"flex items-center justify-center"
												)}
											>
												<User className="h-4 w-4" />
											</div>
										)}
									</motion.div>
								))}
								{isLoading && (
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										className="flex gap-3 justify-start"
									>
										<div
											className={cn(
												"shrink-0",
												"h-8 w-8 rounded-full",
												"bg-primary/10 text-primary",
												"flex items-center justify-center"
											)}
										>
											<Bot className="h-4 w-4" />
										</div>
										<div className="bg-muted text-muted-foreground rounded-lg px-4 py-2">
											<div className="flex gap-1">
												<motion.div
													className="h-2 w-2 bg-muted-foreground rounded-full"
													animate={{ y: [0, -8, 0] }}
													transition={{
														duration: 0.6,
														repeat: Infinity,
														delay: 0,
													}}
												/>
												<motion.div
													className="h-2 w-2 bg-muted-foreground rounded-full"
													animate={{ y: [0, -8, 0] }}
													transition={{
														duration: 0.6,
														repeat: Infinity,
														delay: 0.2,
													}}
												/>
												<motion.div
													className="h-2 w-2 bg-muted-foreground rounded-full"
													animate={{ y: [0, -8, 0] }}
													transition={{
														duration: 0.6,
														repeat: Infinity,
														delay: 0.4,
													}}
												/>
											</div>
										</div>
									</motion.div>
								)}
								<div ref={messagesEndRef} />
							</div>

							{/* Suggested Questions */}
							{showSuggestions && (
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.3, delay: 0.2 }}
									className={cn(
										"px-4 pb-2 border-t border-border bg-card/50",
										"flex flex-wrap gap-2"
									)}
								>
									<span className="text-xs text-muted-foreground w-full mb-1">
										Câu hỏi gợi ý:
									</span>
									{SUGGESTED_QUESTIONS.map((question, index) => (
										<motion.button
											key={index}
											onClick={() => handleSuggestionClick(question)}
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
											className={cn(
												"px-3 py-1.5 rounded-full text-xs",
												"bg-muted hover:bg-muted/80 text-muted-foreground",
												"border border-border/50",
												"transition-colors duration-200",
												"cursor-pointer"
											)}
										>
											{question}
										</motion.button>
									))}
								</motion.div>
							)}

							{/* Input Area */}
							<div className={cn("border-t border-border p-4", "bg-card")}>
								<div className="flex gap-2 items-end">
									<textarea
										ref={inputRef}
										value={input}
										onChange={(e) => setInput(e.target.value)}
										onKeyDown={handleKeyPress}
										placeholder="Nhập câu hỏi của bạn..."
										rows={1}
										className={cn(
											"flex-1 resize-none",
											"px-3 py-2",
											"bg-background border border-input rounded-md",
											"text-sm",
											"focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0",
											"placeholder:text-muted-foreground",
											"max-h-32 overflow-y-auto"
										)}
										style={{
											minHeight: "40px",
											maxHeight: "128px",
										}}
										onInput={(e) => {
											const target = e.target as HTMLTextAreaElement;
											target.style.height = "auto";
											target.style.height = `${Math.min(
												target.scrollHeight,
												128
											)}px`;
										}}
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
									Nhấn Enter để gửi, Shift + Enter để xuống dòng
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

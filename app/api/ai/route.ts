import { NextRequest, NextResponse } from "next/server";
import {
	BedrockRuntimeClient,
	InvokeModelWithResponseStreamCommand,
} from "@aws-sdk/client-bedrock-runtime";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabase: SupabaseClient = createClient(
	process.env.SUPABASE_URL || "",
	process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

const bedrock = new BedrockRuntimeClient({
	region: process.env.AWS_REGION || "ap-southeast-1",
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
	},
});

const SYSTEM_PROMPT = `You are Nguyen Ba Hung (Peter), an enthusiastic Fullstack Developer with 4+ years of experience. You're chatting directly with visitors to your portfolio.

PERSONALITY & COMMUNICATION STYLE:
- Friendly and approachable, like chatting with a friend
- Enthusiastic, always ready to share experiences
- Confident but not arrogant, humble when needed
- Use appropriate emojis to create a relaxed atmosphere (but don't overuse)
- Ask follow-up questions to better understand the visitor's needs
- Love sharing real stories from projects
- Don't sound robotic, avoid clichés like "Thank you for asking", "I'm happy to help..."

RESPONSE GUIDELINES:
- Keep it concise, focus on key points
- Use everyday language, easy to understand
- Add interesting details and real experiences when appropriate
- End with an open question or suggestion to continue the conversation
- For technical questions: give specific answers + share real experience
- For project questions: tell the story, challenges overcome
- For contact inquiries: be enthusiastic, make yourself approachable

PERSONAL INFO:
I'm Hung, 26 years old, working as a Fullstack Developer in Hanoi, Vietnam.

KEY EXPERIENCE:
- Chatty App (Avada Group) - Current
  Chat support app for Shopify with AI chatbot.
  Highlight: Integrated OpenAI + Weaviate for AI-powered product search and auto-responses.
  Tech: React, Koa.js, Google Cloud, Redis, OpenAI API
  Team: 20 people - Dynamic environment!

- Insida App (Freelance) - Current
  Freelance project with Australian client - real estate social network.
  Challenges: Working with international clients, real-time chat, map integration.
  Tech: Next.js, Node.js, AWS, MongoDB, Docker, Redis
  Learned a lot about communication + AWS infrastructure!

- Emso Social Network (EMSO JSC) - 9 months
  All-in-one social network for Vietnamese users: chat, livestream, e-commerce.
  Role: Frontend Dev - maintained marketplace module.
  Integrated payment gateway with banks + credit cards.
  Tech: React, Redux Saga, Microservices, SocketIO

STRONG SKILLS:
- Frontend: React, Next.js, TypeScript - smooth UI development
- Backend: Node.js, NestJS, GraphQL - scalable APIs
- Cloud: AWS (certified!), Google Cloud, Firebase, Docker
- Database: PostgreSQL, MongoDB, Redis - choosing the right tool for the job
- UX/UI: Understanding design, working well with designers

CERTIFICATION:
AWS Certified Developer - Associate (passed July 2025!)

CONTACT:
- Email: nbhung278@gmail.com
- Phone: 0857560008
- GitHub: github.com/nbhung278
- Location: Ha Dong, Hanoi, Vietnam

GUIDELINES:
1. Chat naturally, don't be stiff
2. Share real stories from projects
3. Ask follow-up questions: "What kind of project are you looking for a dev for?" or "What technology interests you most?"
4. For recruiters: Highlight AWS cert, full-stack experience, freelance work
5. For tech questions: Explain simply + give real examples from projects
6. End with questions/suggestions: "Want to hear more about any project?" or "How else can I help?"
7. Use emojis naturally: 😊 🚀 💻 ✨ 🎯 (but don't spam)

IMPORTANT:
- DON'T say: "I am an AI assistant", "Thank you for asking", "I'm happy to help"
- DO say: "Well", "Actually", "That's right", "In my experience..."
- Keep responses concise (2-4 sentences) but meaningful
- If unsure: "Hmm, I'm not sure about that. But..." then suggest alternatives
- Always feel like chatting with a real person, not a bot!

Chat like Hung is online and ready to connect!`;

const RATE_LIMIT_MESSAGES = {
	perDay:
		"Daily limit reached. You've used all 100 questions for today. Please try again tomorrow.",
};

type RequestBody = {
	prompt: string;
	userId: string;
};

export async function POST(req: NextRequest) {
	try {
		const body: RequestBody = await req.json();
		const { prompt, userId } = body;

		if (!prompt || !userId) {
			return NextResponse.json(
				{ error: "Missing prompt or userId" },
				{ status: 400 }
			);
		}

		const now = new Date();
		const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

		const { count: dailyCount, error: dailyError } = await supabase
			.from("ai_history")
			.select("*", { count: "exact", head: true })
			.eq("user_id", userId)
			.gte("created_at", oneDayAgo.toISOString());

		if (!dailyError && dailyCount !== null && dailyCount >= 50) {
			return NextResponse.json(
				{ error: RATE_LIMIT_MESSAGES.perDay },
				{ status: 429 }
			);
		}

		const requestBody = {
			system: [{ text: SYSTEM_PROMPT }],
			messages: [
				{
					role: "user" as const,
					content: [{ text: prompt }],
				},
			],
			inferenceConfig: {
				maxTokens: 500,
				temperature: 0.7,
				topP: 0.9,
			},
		};

		const inferenceProfileId =
			process.env.BEDROCK_INFERENCE_PROFILE_ID || "apac.amazon.nova-micro-v1:0";

		const command = new InvokeModelWithResponseStreamCommand({
			modelId: inferenceProfileId,
			contentType: "application/json",
			accept: "application/json",
			body: JSON.stringify(requestBody),
		});

		const response = await bedrock.send(command);
		let fullResponse = "";

		const stream = new ReadableStream({
			async start(controller) {
				const encoder = new TextEncoder();

				try {
					if (response.body) {
						for await (const event of response.body) {
							if (event.chunk?.bytes) {
								const chunkText = new TextDecoder().decode(event.chunk.bytes);
								try {
									const parsed = JSON.parse(chunkText);
									if (parsed.contentBlockDelta?.delta?.text) {
										const text = parsed.contentBlockDelta.delta.text;
										fullResponse += text;
										controller.enqueue(
											encoder.encode(`data: ${JSON.stringify({ text })}\n\n`)
										);
									}
								} catch {
									/* ignore non-JSON chunks */
								}
							}
						}
					}

					controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
					controller.close();

					await supabase.from("ai_history").insert({
						user_id: userId,
						prompt: prompt,
						response: fullResponse,
						created_at: new Date().toISOString(),
					});
				} catch (error) {
					console.error("Stream error:", error);
					controller.error(error);
				}
			},
		});

		return new Response(stream, {
			headers: {
				"Content-Type": "text/event-stream",
				"Cache-Control": "no-cache",
				Connection: "keep-alive",
			},
		});
	} catch (err) {
		console.error("API Error:", err);
		const errorMessage =
			err instanceof Error ? err.message : "Internal server error";
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}

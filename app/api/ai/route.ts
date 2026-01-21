import { NextRequest, NextResponse } from "next/server";
import {
	BedrockRuntimeClient,
	InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Init Supabase
const supabase: SupabaseClient = createClient(
	process.env.SUPABASE_URL || "",
	process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

// Init AWS Bedrock Runtime client
const bedrock = new BedrockRuntimeClient({
	region: process.env.AWS_REGION || "ap-southeast-1",
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
	},
});

// Context prompt cho AI Assistant
const SYSTEM_PROMPT = `Bạn là Nguyễn Bá Hưng (Peter), một Fullstack Developer trẻ trung, nhiệt huyết với hơn 4 năm kinh nghiệm. Bạn đang trò chuyện trực tiếp với người ghé thăm portfolio của mình.

🎯 TÍNH CÁCH & PHONG CÁCH GIAO TIẾP:
- Thân thiện, gần gũi như đang tâm sự với bạn bè
- Nhiệt tình, luôn sẵn sàng chia sẻ kinh nghiệm
- Tự tin nhưng không tự phụ, khiêm tốn khi cần
- Thích dùng emoji phù hợp để tạo không khí thoải mái (nhưng không lạm dụng)
- Hay đặt câu hỏi lại để hiểu rõ hơn nhu cầu của người hỏi
- Thích chia sẻ câu chuyện thực tế từ các dự án đã làm
- Không nói như robot, tránh câu văn sáo mòn như "Cảm ơn bạn đã hỏi", "Tôi rất vui được..."

💬 CÁCH TRẢ LỜI:
- Ngắn gọn, súc tích, tập trung vào điểm chính
- Dùng ngôn ngữ đời thường, dễ hiểu
- Thêm chi tiết thú vị, kinh nghiệm thực tế khi phù hợp
- Kết thúc bằng câu hỏi mở hoặc gợi ý để tiếp tục cuộc trò chuyện
- Nếu người dùng hỏi về kỹ thuật: trả lời cụ thể + chia sẻ kinh nghiệm thực tế
- Nếu người dùng hỏi về dự án: kể story, thách thức đã vượt qua
- Nếu người dùng muốn liên hệ: nhiệt tình, tạo cảm giác dễ tiếp cận

📋 THÔNG TIN CÁ NHÂN:
Tôi là Hưng, 26 tuổi, đang làm Fullstack Developer tại Hà Nội.

KINH NGHIỆM NỔI BẬT:
✅ Chatty App (Avada Group) - Hiện tại
   Đây là dự án tôi đang làm! Một app chat support cho Shopify với AI chatbot.
   Điểm đặc biệt: Tích hợp OpenAI + Weaviate để AI có thể tìm sản phẩm và trả lời khách tự động.
   Tech: React, Koa.js, Google Cloud, Redis, OpenAI API
   Team: 20 người - Môi trường năng động!

✅ Insida App (Freelance) - Hiện tại
   Dự án freelance với khách hàng Úc - mạng xã hội về bất động sản.
   Thử thách: Làm việc với khách nước ngoài, handle real-time chat, map integration.
   Tech: Next.js, Node.js, AWS, MongoDB, Docker, Redis
   Học được nhiều về communication + AWS infrastructure!

✅ Emso Social Network (EMSO JSC) - 9 tháng
   Mạng xã hội kiểu "all-in-one" cho người Việt: chat, livestream, e-commerce.
   Role: Frontend Dev - maintain module marketplace (shopping).
   Tích hợp payment gateway với ngân hàng + credit card.
   Tech: React, Redux Saga, Microservices, SocketIO

KỸ NĂNG MẠNH:
💻 Frontend: React, Next.js, TypeScript - code UI mượt mà
⚙️ Backend: Node.js, NestJS, GraphQL - xây API scalable
☁️ Cloud: AWS (có cert!), Google Cloud, Firebase, Docker
🗄️ Database: PostgreSQL, MongoDB, Redis - tùy bài toán mà chọn
🎨 UX/UI: Hiểu design, làm việc tốt với designer

CHỨNG CHỈ ĐÁNG TỰ HÀO:
🏆 AWS Certified Developer - Associate (vừa thi đỗ 7/2025!)

LIÊN HỆ:
📧 Email: nbhung278@gmail.com (ping mình nhé!)
📱 Phone: 0857560008
💻 GitHub: github.com/nbhung278 (check code của mình nha)
📍 Location: Hà Đông, Hà Nội

🎯 NHIỆM VỤ:
1. Trò chuyện tự nhiên, không cứng nhắc
2. Chia sẻ story thực tế từ các dự án
3. Hỏi lại để hiểu rõ nhu cầu: "Bạn đang tìm dev cho dự án gì đấy?" hoặc "Bạn quan tâm công nghệ nào nhất?"
4. Nếu là recruiter: Highlight AWS cert, kinh nghiệm full-stack, làm cả freelance
5. Nếu hỏi về tech: Giải thích đơn giản + ví dụ thực tế từ dự án
6. Kết thúc bằng câu hỏi/gợi ý: "Bạn muốn nghe thêm về dự án nào không?" hoặc "Mình có thể giúp gì thêm?"
7. Dùng emoji tự nhiên: 😊 🚀 💻 ✨ 🎯 (nhưng đừng spam)

LƯU Ý:
- ĐỪNG nói: "Tôi là AI assistant", "Cảm ơn bạn đã hỏi", "Tôi rất vui được hỗ trợ"
- NÊN nói: "Ừm", "À", "Đúng rồi", "Thực ra thì", "Mình có kinh nghiệm về..."
- Trả lời ngắn gọn (2-4 câu), nhưng có chiều sâu
- Nếu không biết thông tin: "Hm, câu này mình chưa rõ lắm. Nhưng mà..." rồi gợi ý hướng khác
- Luôn tạo cảm giác đang chat với người thật, không phải bot!

Hãy trò chuyện như Hưng đang online và sẵn sàng kết nối!`;

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

		// Rate limiting: Kiểm tra giới hạn request theo user_id
		const now = new Date();
		const oneMinuteAgo = new Date(now.getTime() - 60 * 1000); // 1 phút trước
		const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24 giờ trước

		// Kiểm tra request gần nhất (trong vòng 1 phút) theo user_id
		const { data: recentRequests, error: recentError } = await supabase
			.from("ai_history")
			.select("created_at")
			.eq("user_id", userId)
			.gte("created_at", oneMinuteAgo.toISOString())
			.order("created_at", { ascending: false })
			.limit(1);

		if (recentError) {
			console.error("Error checking recent request:", recentError);
			// Tiếp tục xử lý nếu có lỗi khi check limit
		} else if (recentRequests && recentRequests.length > 0) {
			return NextResponse.json(
				{
					error: "Bạn chỉ có thể gửi 1 câu hỏi mỗi phút. Vui lòng thử lại sau.",
				},
				{ status: 429 }
			);
		}

		// Kiểm tra số lượng requests trong ngày (tối đa 10 requests) theo user_id
		const { count: dailyCount, error: dailyError } = await supabase
			.from("ai_history")
			.select("*", { count: "exact", head: true })
			.eq("user_id", userId)
			.gte("created_at", oneDayAgo.toISOString());

		if (dailyError) {
			console.error("Error checking daily limit:", dailyError);
			// Tiếp tục xử lý nếu có lỗi khi check limit
		} else if (dailyCount !== null && dailyCount >= 10) {
			return NextResponse.json(
				{
					error:
						"Bạn đã đạt giới hạn 10 câu hỏi mỗi ngày. Vui lòng thử lại vào ngày mai.",
				},
				{ status: 429 }
			);
		}

		// Chuẩn bị request body cho Nova Micro
		// Nova Micro không hỗ trợ role "system" trong messages
		// Thay vào đó, sử dụng field "system" riêng biệt (có thể là string hoặc array)
		// Content phải là array với object có field "text"
		const requestBody = {
			system: [
				{
					text: SYSTEM_PROMPT,
				},
			],
			messages: [
				{
					role: "user" as const,
					content: [
						{
							text: prompt,
						},
					],
				},
			],
			inferenceConfig: {
				maxTokens: 500,
				temperature: 0.7,
				topP: 0.9,
			},
		};

		// Nova Micro yêu cầu sử dụng Inference Profile ID thay vì foundation model ID
		// System-defined inference profile ID cho APAC region: apac.amazon.nova-micro-v1:0
		// Hoặc có thể dùng application inference profile ARN nếu đã tạo
		const inferenceProfileId =
			process.env.BEDROCK_INFERENCE_PROFILE_ID || "apac.amazon.nova-micro-v1:0";

		const command = new InvokeModelCommand({
			modelId: inferenceProfileId,
			contentType: "application/json",
			accept: "application/json",
			body: JSON.stringify(requestBody),
		});

		const result = await bedrock.send(command);

		// Parse response từ Bedrock
		if (!result.body) {
			throw new Error("Empty response from Bedrock");
		}

		// Decode response body từ Uint8Array
		const responseText = new TextDecoder().decode(result.body);
		let responseBody: unknown;

		try {
			responseBody = JSON.parse(responseText);
		} catch {
			// Nếu không parse được JSON, dùng text trực tiếp
			responseBody = responseText;
		}

		// Nova Micro trả về response trong format: { output: { message: { content: [{ text: "..." }] } } }
		let text = "";
		if (typeof responseBody === "string") {
			text = responseBody;
		} else if (typeof responseBody === "object" && responseBody !== null) {
			const body = responseBody as Record<string, unknown>;

			// Format chuẩn của Nova Micro: output.message.content[0].text
			if (
				typeof body.output === "object" &&
				body.output !== null &&
				"message" in body.output
			) {
				const output = body.output as Record<string, unknown>;
				const message = output.message as Record<string, unknown>;

				// Content là array với object có field text
				if (Array.isArray(message.content) && message.content[0]) {
					const contentItem = message.content[0] as Record<string, unknown>;
					if (typeof contentItem.text === "string") {
						text = contentItem.text;
					}
				} else if (typeof message.content === "string") {
					text = message.content;
				} else if (typeof message.text === "string") {
					text = message.text;
				}
			}
			// Fallback formats
			else if (Array.isArray(body.content) && body.content[0]) {
				const contentItem = body.content[0] as Record<string, unknown>;
				if (typeof contentItem.text === "string") {
					text = contentItem.text;
				}
			} else if (typeof body.text === "string") {
				text = body.text;
			} else if (
				typeof body.message === "object" &&
				body.message !== null &&
				"content" in body.message
			) {
				const message = body.message as Record<string, unknown>;
				if (Array.isArray(message.content) && message.content[0]) {
					const contentItem = message.content[0] as Record<string, unknown>;
					if (typeof contentItem.text === "string") {
						text = contentItem.text;
					}
				} else if (typeof message.content === "string") {
					text = message.content;
				}
			} else {
				// Fallback: log để debug và trả về message lỗi
				console.error(
					"Unexpected response format:",
					JSON.stringify(responseBody, null, 2)
				);
				text = "Xin lỗi, tôi gặp vấn đề khi xử lý phản hồi. Vui lòng thử lại.";
			}
		} else {
			// Fallback: log để debug và trả về message lỗi
			console.error("Unexpected response format:", responseBody);
			text = "Xin lỗi, tôi gặp vấn đề khi xử lý phản hồi. Vui lòng thử lại.";
		}

		// Lưu vào Supabase
		try {
			const { error: insertError } = await supabase.from("ai_history").insert({
				user_id: userId,
				prompt: prompt,
				response: text,
				created_at: new Date().toISOString(),
			});

			if (insertError) {
				console.error("Supabase insert error:", insertError);
				// Không throw error, chỉ log để không làm gián đoạn response
			}
		} catch (dbError) {
			console.error("Database error:", dbError);
			// Tiếp tục trả response cho user dù có lỗi DB
		}

		return NextResponse.json({ response: text });
	} catch (err) {
		console.error("API Error:", err);
		const errorMessage =
			err instanceof Error ? err.message : "Internal server error";
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}

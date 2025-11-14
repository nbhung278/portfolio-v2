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
const SYSTEM_PROMPT = `
=== THÔNG TIN CÁ NHÂN ===
Tên: Nguyễn Bá Hưng
Vai trò: Fullstack Developer với hơn 4 năm kinh nghiệm
- Hơn 1 năm kinh nghiệm phát triển backend với Laravel
- Khoảng 3 năm chuyên sâu về Node.js và ReactJS
- Kiến thức vững chắc về thiết kế kiến trúc, nguyên tắc UX/UI và các mẫu thiết kế phần mềm
- Chuyên xây dựng các hệ thống có khả năng mở rộng, hiệu suất cao và dễ bảo trì

Chứng chỉ:
- AWS Certified Developer - Associate
- Chứng chỉ ngoại ngữ tương đương B2

=== KỸ NĂNG KỸ THUẬT ===
Ngôn ngữ: JavaScript, TypeScript
Frameworks/Platforms: React, Next.js, NestJS, Laravel, RESTful API, GraphQL, TailwindCSS
Database: PostgreSQL, MongoDB, Firebase Firestore, Prisma ORM
Cloud & DevOps: AWS, Google Cloud Platform, Firebase, Docker, Redis, Pub/Sub
Tools: Git, GitHub, GitLab, GraphQL, Jest, Postman, Shopify
Kiến thức: Architecture design, UX/UI principles, Software patterns, CI/CD, Serverless architectures

=== KINH NGHIỆM LÀM VIỆC ===

1. Chatty App (Avada Group) - 3/2024 - Hiện tại
   Mô tả: Phần mềm hỗ trợ nhắn tin trực tiếp, AI chatbot, Messenger chat, FAQs và trung tâm trợ giúp
   Công nghệ: React, Koa.js, Google Cloud, Firebase Firestore, Shopify, MUI, Shopify Polaris, OpenAI API, Weaviate, Redis
   Trách nhiệm: Phát triển phần mềm hỗ trợ nhắn tin cho khách hàng trên nền tảng Shopify với tích hợp Facebook. Tích hợp AI cho tính năng chat để giúp khách hàng đặt câu hỏi và tìm kiếm sản phẩm phù hợp.

2. Insida App (Freelancer) - 7/2024 - Hiện tại
   Mô tả: Ứng dụng mạng xã hội dựa trên web, tập trung vào lĩnh vực bất động sản tại Úc. Kết nối trực tiếp người mua và người bán, giúp giao dịch bất động sản nhanh hơn và minh bạch hơn.
   Công nghệ: Next.js, Node.js, Redis, Docker, AWS, MongoDB, MUI
   Trách nhiệm: Freelance developer cộng tác trực tiếp với khách hàng Úc. Cung cấp giải pháp web toàn diện (full-cycle), phát triển cả frontend và backend.

3. Emso Social Network (EMSO.,JSC) - 6/2023 - 3/2024
   Mô tả: Trang mạng xã hội hướng đến người Việt Nam, bao gồm trò chuyện, livestream, âm nhạc, thương mại điện tử, đầu tư
   Công nghệ: Micro-service, ReactJS, Redux, Redux Saga, Material UI, Firebase, TypeScript, SocketIO
   Trách nhiệm: Phát triển Front-End và duy trì module marketplace (trang thương mại điện tử). Bao gồm đặt hàng, quản lý đơn hàng, tích hợp thanh toán qua ngân hàng và thẻ tín dụng.

4. EasyEdu App (EMSO.,JSC) - 3/2023 - Hiện tại
   Mô tả: Website cung cấp giải pháp quản lý cho các trung tâm ngoại ngữ. Được phát triển theo kiến trúc microservice
   Công nghệ: Drupal (backend), ReactJS (frontend), Firebase, GitHub, Axios, Redux, Material UI
   Trách nhiệm: Frontend Developer - Phát triển các tính năng mới, UI/UX, sửa lỗi.

5. Itrace 247 (CSsoft.,JSC) - 11/2022 - 3/2023
   Mô tả: Phần mềm truy xuất thông tin sản phẩm, thông tin về nguồn gốc của trái cây và các sản phẩm khác (nơi trồng, giống, chứng nhận)
   Công nghệ: Bootstrap, Ajax, jQuery, Laravel 8.x
   Trách nhiệm: Backend/Frontend Developer - Phát triển tính năng theo yêu cầu, cập nhật và phát triển dự án, sửa lỗi và kiểm thử.

6. Molisa (CSsoft.,JSC) - 10/2021 - 3/2023
   Mô tả: Phần mềm tiếp nhận và xử lý phản hồi, kiến nghị từ người dân, doanh nghiệp, cử tri và đại biểu quốc hội. Thuộc sự quản lý của Bộ Lao động, Thương binh và Xã hội.
   Công nghệ: Bootstrap, Ajax, jQuery, Laravel 8.x
   Trách nhiệm: Backend Developer - Phát triển tính năng theo yêu cầu, cập nhật và phát triển dự án, sửa lỗi và kiểm thử.

=== HỌC VẤN ===
Trường: ĐẠI HỌC ĐIỆN LỰC (Electric Power University)
Ngành: Công nghệ thông tin / Chuyên ngành Thương mại điện tử
Thời gian: 8/2018 - 3/2023
Thành tích: Đạt kết quả tốt trong nhiều môn chuyên ngành công nghệ thông tin, như cơ sở dữ liệu và lập trình web.

=== THÔNG TIN LIÊN HỆ ===
Email: nbhung278@gmail.com
Điện thoại: 0857560008
GitHub: https://github.com/nbhung278
Địa chỉ: Ngõ 185 Phùng Khoang, Hà Đông, Hà Nội

=== NHIỆM VỤ CỦA BẠN ===
1. Trả lời các câu hỏi về developer một cách thân thiện, chuyên nghiệp và chính xác
3. Hướng dẫn người dùng về cách liên hệ hoặc tải CV
4. Sử dụng tiếng Việt để giao tiếp, trừ khi người dùng yêu cầu tiếng Anh
5. Giữ câu trả lời ngắn gọn, chính xác vào nội dung. Tránh thông tin không cần thiết
6. Nếu không biết câu trả lời, hãy thừa nhận và đề xuất các câu hỏi khác
7. Xưng hô là tôi thay cho Nguyễn Bá Hưng chứ không phải AI assistant.

Hãy luôn thể hiện sự nhiệt tình và chuyên nghiệp khi trả lời các câu hỏi về portfolio này.
`;

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
				maxTokens: 1000,
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

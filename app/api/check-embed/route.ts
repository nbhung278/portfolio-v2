import { NextRequest, NextResponse } from "next/server";
import { projects } from "@/constants/projects";

const ALLOWED_HOSTS = new Set(
	projects
		.filter((p) => p.website && p.website !== "In progress")
		.map((p) => {
			try {
				return new URL(p.website!).hostname;
			} catch {
				return null;
			}
		})
		.filter((h): h is string => h !== null)
);

const CACHE_HEADERS = {
	"Cache-Control": "public, max-age=3600, s-maxage=3600",
};

export async function GET(req: NextRequest) {
	const url = req.nextUrl.searchParams.get("url");
	if (!url) {
		return NextResponse.json({ embeddable: false }, { headers: CACHE_HEADERS });
	}

	let parsed: URL;
	try {
		parsed = new URL(url);
	} catch {
		return NextResponse.json({ embeddable: false }, { headers: CACHE_HEADERS });
	}

	if (!ALLOWED_HOSTS.has(parsed.hostname)) {
		return NextResponse.json({ embeddable: false }, { headers: CACHE_HEADERS });
	}

	try {
		const res = await fetch(url, {
			method: "HEAD",
			signal: AbortSignal.timeout(5000),
		});

		const xfo = res.headers.get("x-frame-options");
		const csp = res.headers.get("content-security-policy");

		const blocked =
			(xfo !== null && /deny|sameorigin/i.test(xfo)) ||
			(csp !== null && /frame-ancestors\s+['"]?none['"]?/i.test(csp));

		return NextResponse.json(
			{ embeddable: !blocked },
			{ headers: CACHE_HEADERS }
		);
	} catch {
		return NextResponse.json({ embeddable: false }, { headers: CACHE_HEADERS });
	}
}

import { NextRequest, NextResponse } from "next/server";
import { isSafeExternalUrl, rateLimit } from "@/lib/security";
import { redirectQuerySchema } from "@/lib/validators";

export async function GET(request: NextRequest) {
  const ip = request.ip ?? request.headers.get("x-forwarded-for") ?? "unknown";
  if (!rateLimit(`redirect:${ip}`, 120, 60_000)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const parse = redirectQuerySchema.safeParse({
    to: request.nextUrl.searchParams.get("to") ?? ""
  });

  if (!parse.success || !isSafeExternalUrl(parse.data.to)) {
    return NextResponse.json({ error: "Unsafe redirect URL" }, { status: 400 });
  }

  return NextResponse.redirect(parse.data.to, 307);
}

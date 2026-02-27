import { NextRequest, NextResponse } from "next/server";
import { getCompanies } from "@/lib/companies";
import { rateLimit } from "@/lib/security";
import { companyQuerySchema } from "@/lib/validators";

export async function GET(request: NextRequest) {
  const ip = request.ip ?? request.headers.get("x-forwarded-for") ?? "unknown";
  if (!rateLimit(`companies:${ip}`, 80, 60_000)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const queryResult = companyQuerySchema.safeParse({
    search: request.nextUrl.searchParams.get("search") ?? undefined,
    category: request.nextUrl.searchParams.get("category") ?? undefined,
    country: request.nextUrl.searchParams.get("country") ?? undefined,
    size: request.nextUrl.searchParams.get("size") ?? undefined
  });

  if (!queryResult.success) {
    return NextResponse.json({ error: "Invalid query parameters" }, { status: 400 });
  }

  const data = await getCompanies(queryResult.data);
  return NextResponse.json(data);
}

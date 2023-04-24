/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token: any = req.cookies.get("USER_TOKEN_DATA_PLATFORM");
  if (req.nextUrl.pathname === "/auth/login/" && token) {
    return NextResponse.redirect(`${process.env.CLIENT_URL}/data/management1`);
  }
  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(`${process.env.CLIENT_URL}/auth/login`);
  }
  if (req.nextUrl.pathname === "/" && token) {
    return NextResponse.redirect(`${process.env.CLIENT_URL}/data/management`);
  }
  if (
    req.nextUrl.pathname.startsWith("/data/management") &&
    token?.value === undefined
  ) {
    return NextResponse.redirect(`${process.env.CLIENT_URL}/auth/login`);
  }
  return NextResponse.next();
}

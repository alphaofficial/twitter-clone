import { NextRequest, NextResponse } from "next/server";

const signedinPages = [
  "/home",
  "/explore",
  "/notifications",
  "/messages",
  "/bookmarks",
  "/lists",
  "profiles",
];

// this is not a node environment so you only have access to low level runtime apis
export default function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/") {
    const token = req.cookies.X_ACCESS_TOKEN;
    if (token) {
      return NextResponse.redirect("/home");
    }
    return;
  }
  if (signedinPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.X_ACCESS_TOKEN;

    if (!token) {
      return NextResponse.redirect("/");
    }
  }
}

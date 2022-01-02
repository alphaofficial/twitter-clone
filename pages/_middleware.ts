import { NextRequest, NextResponse } from "next/server";

const signedinPages = ["/", "/account", "/settings"];

// this is not a node environment so you only have access to low level runtime apis
export default function middleware(req: NextRequest) {
  if (signedinPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.X_ACCESS_TOKEN;

    if (!token) {
      return NextResponse.redirect("/signin");
    }
  }
}

import { NextRequest, NextResponse } from "next/server";
import { checkSession } from "./lib/api/serverApi";

const PRIVATE_PATHS = ["/profile", "/notes"];
const AUTH_PATHS = ["/sign-in", "/sign-up"];

function isPrivatePath(pathname: string) {
  return PRIVATE_PATHS.some((p) => pathname.startsWith(p));
}

function isAuthPath(pathname: string) {
  return AUTH_PATHS.some((p) => pathname.startsWith(p));
}

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  let isLoggedIn = Boolean(accessToken);

  if (!accessToken && refreshToken) {
    try {
      const response = await checkSession();
      isLoggedIn = response.data?.success === true;

      if (isLoggedIn) {
        const nextResponse = isAuthPath(pathname)
          ? NextResponse.redirect(new URL("/", request.url))
          : NextResponse.next();

        const setCookie = response.headers["set-cookie"];
        if (setCookie) {
          const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
          cookieArray.forEach((cookie) => {
            nextResponse.headers.append("Set-Cookie", cookie);
          });
        }

        return nextResponse;
      }
    } catch {
      isLoggedIn = false;
    }
  }

  if (isPrivatePath(pathname) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (isAuthPath(pathname) && isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
// middleware.ts
import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";
import { USER_ROLE } from "@/lib/constants/user-roles";

type UserRole = "superAdmin" | "admin" | "teacher" | "parent";

const roleAccess: Record<UserRole, string[]> = {
  superAdmin: [
    "/panels/admin-dashboard",
    "/panels/institution",
    "/panels/kid-report",
    "/panels/parent",
    "/panels/teacher",
  ],
  admin: ["/panels/institution"],
  teacher: ["/panels/teacher", "/panels/kid-report"],
  parent: ["/panels/parent"],
};

export default withAuth(async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    // No token found, redirect to login page
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const userRole = token?.role as UserRole; // Assuming the token contains the role of the user
  const { pathname } = req.nextUrl;

  // User role and path for access control

  // Check if the user has access to the requested path
  if (userRole && roleAccess[userRole]) {
    const allowedPaths = roleAccess[userRole];

    // Special case for superAdmin - allow access to everything
    if (userRole === "superAdmin") {
      return NextResponse.next();
    }

    // If the user is trying to access a path they are allowed to
    if (allowedPaths.some((path: string) => pathname.startsWith(path))) {
      return NextResponse.next(); // Allow the request to continue
    }

    // If the user doesn't have access to the requested path, redirect to the first allowed path
    return NextResponse.redirect(new URL(allowedPaths[0], req.url));
  }

  // If the role is not recognized, redirect to the login page or 403
  return NextResponse.redirect(new URL("/403", req.url));
});
// Apply the middleware to the panels routes
export const config = {
  matcher: ["/panels/:path*"], // Apply to all /panels routes
};

import { loginUser } from "@/lib/auth/customLogin";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export async function POST(req: NextRequest) {
  try {
    // Extract email and password from the request body
    const { email, password } = await req.json();

    // Call the loginUser function to authenticate and get user data
    //const userData = await loginUser(email, password);

    const userData =   {
      firstName: "John",
      middleName: "A.", // Middle name could be null, undefined, or a string
      lastName: "Doe",
      email: "john.doe@example.com",
      phoneNumber: "+1234567890",
      position: "Teacher", // Assuming "position" can be a string or any other type
      roles: [
        { roleName: "Teacher", permissions: ["create", "read", "update"] },
        { roleName: "Parent", permissions: ["read"] },
      ],
      jwtToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummyJwtPayload.dummyJwtSignature",
      institutions: [101, 102] // Assuming these are institution IDs
    };
    const jwtToken = userData.jwtToken;

    // Create the response object
    const response = NextResponse.json({
      message: "Login successful",
      userData,
    });

    // Manually set the cookies using NextResponse's headers
    response.cookies.set("jwtToken", jwtToken, {
      httpOnly: true, // Only accessible by the server
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      maxAge: 30 * 24 * 60 * 60, // Cookie expiration set to 30 days
      path: "/",
      sameSite: "lax", // CSRF protection setting
    } as any);

    // Store the userData as a cookie (if necessary)
    response.cookies.set("userData", JSON.stringify(userData), {
      httpOnly: true, // Only accessible by the server
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60, // Cookie expiration set to 30 days
      path: "/",
      sameSite: "lax",
    } as any);

    // Return the response with cookies attached
    return response;
  } catch (error: any) {
    // Handle any error that occurs during login
    return NextResponse.json(
      { error: error.message || "Login failed" },
      { status: 401 }
    );
  }
}

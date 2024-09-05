
import { NextResponse } from "next/server";

import { withAuth } from "next-auth/middleware"


export default withAuth (

  function middleware(req){
    if(req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token?.role !== "admin"){
      return NextResponse.rewrite(new URL("/auth/login?message=You are not Authorized",req.url))
    }
    if(req.nextUrl.pathname.startsWith("/user") && req.nextauth.token?.role !== "user"){
      return NextResponse.rewrite(new URL("/auth/login?message=You are not Authorized",req.url))
    }
  },
  {
    callback : {
      authorized:({token}) => !!token

    }
  }
)


export const config = {
  mather: ["/admin/:path*" , "/user/:path*"],
}
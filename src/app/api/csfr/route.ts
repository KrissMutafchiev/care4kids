import {NextResponse} from "next/server";

export async function GET(){
  const res = await fetch(
    "http://ec2-3-125-52-214.eu-central-1.compute.amazonaws.com:8080/csrf/token",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
  const data = await res.json();
  return NextResponse.json(data)
}
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" }); // Handle non-POST requests
  }

  try {
    // Extract email and password from the request body
    const { email, password } = JSON.parse(req.body);


    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    console.log('------@@@--->', email)
    console.log('------@@@--->',password)

    // Send the POST request to the external server
    const response = await fetch(
      "http://ec2-3-125-52-214.eu-central-1.compute.amazonaws.com:8080/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }), // Send the extracted email and password
      }
    );

    console.log(response.body);
    if (!response.ok) {
      throw new Error('Failed to fetch User ');
    }

    const user = await response.json();
    if (!user) {
      return res.status(500).json({ error: "User not found" });
    }

    // Send the user data as the response
    res.status(200).json({ user });
  } catch (error: any) {
    // Handle errors and send an error response
    res.status(500).json({ error: error.message });
  }
}

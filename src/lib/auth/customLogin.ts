// lib/auth/customLogin.ts


export async function loginUser(email: string, password: string) {
    // Send credentials to your Java back-end for authentication
    const url = `http://ec2-3-125-52-214.eu-central-1.compute.amazonaws.com:8080/login`
    const response = await fetch(
        url,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

  if (!response.ok) {
    throw new Error("Failed to log in to the Java server");
  }

  const data = await response.json();

  // Return user data if needed
  return data;
}

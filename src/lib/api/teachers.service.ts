

import { cookies } from "next/headers";

const cookieStore = cookies();

export const getTeachers = async (institutionId: number, page?: number, size?: number) => {

  const jwtToken = cookieStore.get("jwtToken")?.value; 

  let url = `http://ec2-3-125-52-214.eu-central-1.compute.amazonaws.com:8080/institutions/teachers/all?institutionId=${institutionId}`;

  // Append pagination parameters if provided
  if (page !== undefined && size !== undefined) {
    url += `&page=${page}&size=${size}`;
  }
    
  const response = await fetch(url, {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${jwtToken}`,  // Include the JWT token in the Authorization header
      'Content-Type': 'application/json',     // Set content type
    },
  });

  // Handle the response
  if (!response.ok) {
    throw new Error("Failed to fetch teachers");
  }

  return response.json();
};

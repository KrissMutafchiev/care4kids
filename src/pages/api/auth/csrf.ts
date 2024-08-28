export default async function handler(req:any, res:any) {
    try {
      const response = await fetch(
        "http://ec2-3-125-52-214.eu-central-1.compute.amazonaws.com:8080/csrf/token",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!response.ok) {
        throw new Error('Failed to fetch CSRF token');
      }
  
      const data = await response.json();
      const csrfToken = data?.token;
  
      if (!csrfToken) {
        return res.status(500).json({ error: 'CSRF token not found' });
      }
  
      res.status(200).json({ csrfToken });
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
  }
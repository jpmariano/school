import { NextApiRequest, NextApiResponse } from 'next';
//Not being called
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/oauth/revoke`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });

    if (response.ok) {
        return res.status(200).json({ message: 'Token revoked successfully' });
    } else {
        const errorText = await response.text();
       return res.status(response.status).json({ error: errorText });
    }
  } catch (error) {
    console.error('Error revoking token:', error);
  }

}

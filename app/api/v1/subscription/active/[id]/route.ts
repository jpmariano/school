import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/utils/authOptions"; // adjust the path as needed
import { CustomSession, ErrorResponse } from '@/types';
import CustomError from '@/utils/CustomError';
type ResponseData = {
  message: string
}
 
export async function GET(request: NextRequest, { params }: { params: { id: string } }) : Promise<Response|ErrorResponse>  {
	//console.log('params********', params.id);

  const session = await getServerSession(authOptions) as CustomSession;
	const headers = {
		"Content-Type": "application/json",
		"Authorization": `Bearer ${session.user.access_token}`
	};
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/subscription/active/${params.id}?_format=json`, {
			method: "GET",
			headers: headers,
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result: Response = response;
		return result;
	} catch (error) {
		if (error instanceof CustomError) {
			return {
				success: false,
				message: error.message,
				status: error.statusCode
			};
		}
		return {
			success: false,
			message: error instanceof Error ? error.message : "Unknown error",
			status: 500
		};
	}
}


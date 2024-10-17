import { NextResponse } from "next/server";

export const updateAccessToken = async () => {
    try {
        const response = await fetch(`/api/auth/token`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) {
            return NextResponse.json({ message: 'something went wrong updating access token' }, { status: response.status });
        }

        //const data = response.json();
        return response;
      } catch (error) {
        return {
			success: false,
			message: error instanceof Error ? error.message : "getting access token failed",
			status: 500
		};
      }
};
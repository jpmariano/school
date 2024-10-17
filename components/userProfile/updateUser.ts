import { NextResponse } from "next/server";

export const updateUser = async (uid:string, userupdate: any) => {
    try {

        if (!userupdate) {
            return NextResponse.json({ message: 'user update json not found' }, { status: 400 });
        }

        const response = await fetch(`/api/user/${uid}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userupdate),
          });
        
        if (!response.ok) {
            return NextResponse.json({ message: 'something went wrong updating user' }, { status: response.status });
        }

        const data = response.json();
        return data;
      } catch (error) {
        return {
			success: false,
			message: error instanceof Error ? error.message : "Server failed Patch user",
			status: 500
		};
      }
};
import { CustomJWT, CustomSession, ErrorResponse, Token } from "@/types";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest):  Promise<Response | ErrorResponse> {
    const session = await getServerSession(authOptions) as CustomSession;
    try {
        const client_id = process.env.CLIENT_ID;
        const client_secret = process.env.NEXTAUTH_SECRET;
     
        if (!client_id || !client_secret) {
            throw new Error("Missing environment variables");
        }
    
         // Create a new FormData object
         //const formData = new FormData();
         const formData = new URLSearchParams();
         formData.append("grant_type", "refresh_token");
         formData.append("client_id", client_id);
         formData.append("client_secret", client_secret);
         formData.append("refresh_token", session.user.refresh_token!);
    
         //console.log('formData', formData);
        // console.log(process.env.NEXT_PUBLIC_API_URL);
         
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/oauth/token`, {
        method: "POST",
        headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
        redirect: "follow"
    });
    if (!response.ok) {
        //throw new Error(`HTTP error! status: ${response.status}`);
        return NextResponse.json({ message: 'something went refreshing access_token' }, { status: response.status });
      }
      const result:Response = response;
	  return result;
  
      
    } catch (error) {
      // In case of parsing error or unexpected issues
      return NextResponse.json({ message: 'something went refreshing access_token' }, { status: 500 });
    }
}
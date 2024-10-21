import { NextResponse } from "next/server";

export const getActiveSubscription = async (id: string) => {
  
    try {
        const response = await fetch(`/api/v1/subscription/active/${id}`);
        
        if (!response.ok) {
          //return NextResponse.json({ message: `HTTP error! status: ${response.status}` }, { status: response.status });
          throw new Error(`HTTP error!  ${response.statusText} : ${response.status}`);
        }
        const data = response.json();
        return data;
      } catch (error) {
          return {
          success: false,
          message: error instanceof Error ? error.message : "Server failed getting user profile",
          status: 500
        };
      }
  }; 

export default getActiveSubscription;
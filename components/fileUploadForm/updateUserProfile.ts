import { CompletedCourse, CustomSession, UserAccountDetails, UserPicture } from "@/types";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";



export const PatchUserProfile = async (uid: string, userPicture: UserPicture) => {

    try {

        if (!userPicture) {
            return NextResponse.json({ message: 'userProfile json not found' }, { status: 400 });
        }

        const response = await fetch(`/api/user/${uid}/picture`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userPicture),
          });
        
        if (!response.ok) {
            return NextResponse.json({ message: 'something went wrong UserProfile' }, { status: response.status });
        }

        const data = response.json();
        return data;
      } catch (error) {
        return {
			success: false,
			message: error instanceof Error ? error.message : "Server failed Patching completed-course",
			status: 500
		};
      }
}; 

export default PatchUserProfile;

export const FetchUserProfile = async (id: string) => {
  
    try {
        const response = await fetch(`/api/user/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = response.json();
        return data;
      } catch (error) {
        console.log('FetchUserProfileresponse', id);
          return {
          success: false,
          message: error instanceof Error ? error.message : "Server failed getting user profile",
          status: 500
        };
      }
  }; 

export default FetchUserProfile;
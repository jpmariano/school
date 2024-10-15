export const GetUserProfilePicture = async (id: string) => {
  
    try {
        const response = await fetch(`/api/file/private/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const fileBlob = await response.blob();
        const fileUrl = URL.createObjectURL(fileBlob);
        //const data = response.json();
        return fileUrl;
      } catch (error) {
          return {
          success: false,
          message: error instanceof Error ? error.message : "Server failed getting user profile",
          status: 500
        };
      }
  }; 

export default GetUserProfilePicture;
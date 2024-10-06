export const FetchCompletionData = async (uid: string, field_lesson_ref: string) => {
    try {
        const response = await fetch(`/api/completed-lesson?uid=${uid}&field_lesson_ref=${field_lesson_ref}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = response.json();
        return data;
      } catch (error) {
        return {
			success: false,
			message: error instanceof Error ? error.message : "Server failed getting completed-lesson",
			status: 500
		};
      }
  }; 

export default FetchCompletionData;
import { BASE_URL } from '@/api/config';
import { PathDetails, lessonid, listOfLessons, node, AccountCredentials, AccountResetCredentials, verifyCredentials } from '@/types';
import userData from '@/data/userLogin.json';

export const jsonapi = '/jsonapi';
export const router = '/router';


//Step 1: user signup - server sends an email
export const userSignup = async  (credentials: AccountCredentials) => {
	const headers = {
		"Content-Type": "application/json",
	  };
	const data = {
		"mail": credentials.email,
		"pass": credentials.password
	  };
	
	  try {
		const response = await fetch(`${BASE_URL}/rest/create-account?_format=json`, {
		  method: "POST",
		  headers: headers,
		  body: JSON.stringify(data)
		});
	
		if (!response.ok) {
		  throw new Error(`HTTP error! status: ${response.status}`);
		}
	
		const result = await response.json();
		return result;
	  } catch (error) {
		console.error('Error:', error);
	  }
}
//Step 2: User clicks on the verification link
export const verifyUser = async  (credentials: verifyCredentials) => {
	const headers = {
		"Content-Type": "application/json",
	  };
	const data = {
		"name": credentials.name,
		"temp_token": credentials.temp_token
	  };
	
	  try {
		const response = await fetch(`${BASE_URL}/rest/verify-account?_format=json`, {
		  method: "POST",
		  headers: headers,
		  body: JSON.stringify(data)
		});
	
		if (!response.ok) {
		  throw new Error(`HTTP error! status: ${response.status}`);
		}
	
		const result = await response.json();
		return result;
	  } catch (error) {
		console.error('Error:', error);
	  }
}

export const userLogin = async  (credentials: AccountCredentials) => {
	const headers = {
		"Content-Type": "application/json",
	  };
	const client_id = process.env.NEXT_PUBLIC_CLIENT_ID;
	const client_secret = process.env.NEXT_PUBLIC_CLIENT_SECRET;
 
	if (!client_id || !client_secret) {
		throw new Error("Missing environment variables");
	}

	 // Create a new FormData object
	 const formData = new FormData();
	 formData.append("grant_type", "password");
	 formData.append("client_id", client_id);
	 formData.append("client_secret", client_secret);
	 formData.append("username", credentials.email);
	 formData.append("password", credentials.password);
	
	  try {
		const response = await fetch(`${BASE_URL}/oauth/token?_format=json`, {
		  method: "POST",
		  headers: headers,
		  body: formData
		});
	
		if (!response.ok) {
		  throw new Error(`HTTP error! status: ${response.status}`);
		}
	
		const result = await response.json();
		return result;
	  } catch (error) {
		console.error('Error:', error);
	  }
}

export const getNewAccessToken = async  (refresh_token: string) => {
	const headers = {
		"Content-Type": "application/json",
	  };
	const client_id = process.env.NEXT_PUBLIC_CLIENT_ID;
	const client_secret = process.env.NEXT_PUBLIC_CLIENT_SECRET;
 
	if (!client_id || !client_secret) {
		throw new Error("Missing environment variables");
	}

	 // Create a new FormData object
	 const formData = new FormData();
	 formData.append("grant_type", "refresh_token");
	 formData.append("client_id", client_id);
	 formData.append("client_secret", client_secret);
	 formData.append("refresh_token", refresh_token);

	
	  try {
		const response = await fetch(`${BASE_URL}/oauth/token?_format=json`, {
		  method: "POST",
		  headers: headers,
		  body: formData
		});
	
		if (!response.ok) {
		  throw new Error(`HTTP error! status: ${response.status}`);
		}
	
		const result = await response.json();
		return result;
	  } catch (error) {
		console.error('Error:', error);
	  }
}

export const userLogout= async  (access_token: string) => {
	const headers = {
		"Content-Type": "application/json",
	  };
	const data = {
		"token": access_token
	  };
	
	  try {
		const response = await fetch(`${BASE_URL}/oauth/revoke?_format=json`, {
		  method: "POST",
		  headers: headers,
		  body: JSON.stringify(data)
		});
	
		if (!response.ok) {
		  throw new Error(`HTTP error! status: ${response.status}`);
		}
	
		const result = await response.json();
		return result;
	  } catch (error) {
		console.error('Error:', error);
	  }
}

export const getUserInfo= async  (token: string) => {
	const headers = {
		"Content-Type": "application/json",
	  };
	const data = {
		"Authorization": `Bearer ${token}`
	  };
	
	  try {
		const response = await fetch(`${BASE_URL}/oauth/userinfo?_format=json`, {
		  method: "GET",
		  headers: headers,
		  body: JSON.stringify(data)
		});
	
		if (!response.ok) {
		  throw new Error(`HTTP error! status: ${response.status}`);
		}
	
		const result = await response.json();
		return result;
	  } catch (error) {
		console.error('Error:', error);
	  }
}
  
  
  

  //step 1. send an email
  export const resetPassword = async (emailAddress: string) => {
	const headers = {
		"Content-Type": "application/json",
	  };
	  const data = {
		"mail": emailAddress
	  };
	
	  try {
		const response = await fetch(`${BASE_URL}/user/lost-password?_format=json`, {
		  method: "POST",
		  headers: headers,
		  body: JSON.stringify(data)
		});
	
		if (!response.ok) {
		  throw new Error(`HTTP error! status: ${response.status}`);
		}
	
		const result = await response.json();
		return result;
	  } catch (error) {
		console.error('Error:', error);
	  }
  }
  //step 2. change the password
 export const passwordReset = async (accountresetcredentials: AccountResetCredentials) => {
	const headers = {
	  "Content-Type": "application/json",
	};
  
	try {
	  const response = await fetch(`${BASE_URL}/user/lost-password-reset?_format=json`, {
		method: "POST",
		headers: headers,
		body: JSON.stringify(accountresetcredentials)
	  });
  
	  if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	  }
  
	  const result = await response.json();
	  return result;
	} catch (error) {
	  console.error('Error:', error);
	}
  };
  
  
  

export const getPage = async (slug: string ): Promise<PathDetails> => {
	const response = await fetch(`${BASE_URL}/router/translate-path?path=${slug}`);
	const data = await response.json();
	return data;
}

export const getListofLessonByTaxId = async (taxid: string): Promise<listOfLessons> => {
	const response = await fetch(`${BASE_URL}/api/v1/lesson/${taxid}?_format=json`);
	const result = await response.json();
	return result;
  } 
  
  
export const getListofCompletedLessonsbySubject = async (uid: string, taxid: string): Promise<lessonid[]> => {
	const response = await fetch(`${BASE_URL}/api/v1/subject/completed/${uid}/${taxid}?_format=json`);
	const result = await response.json();
	return result;
  }
  
  
export const getLessonCompletion = async (uid: string, field_lesson_ref: string): Promise<lessonid[]> => {
	const response = await fetch(`${BASE_URL}/api/v1/lesson/completed/${uid}/${field_lesson_ref}?_format=json`);
	const result = await response.json();
	return result;
  } 
  
export const getNode = async (uuid = '', bundle = ''): Promise<node> => {
	let params:string = ``;
	  switch (bundle) {
		  case 'lesson': {
		params = `include=field_paragraph_lesson.field_image`;
			  break;
		  }
		  default: {
			  break;
		  }
	  }
	const response = await fetch(`${BASE_URL}/jsonapi/node/${bundle}/${uuid}?${params}`);
	  const data = await response.json();
	  
	  return data;
  }
  
export const getTaxonomyTerm = async (uuid: string): Promise<node> => {
	const response = await fetch(`${BASE_URL}/jsonapi/taxonomy_term/subject/${uuid}`);
	const data = await response.json();
	return data;
  }

  export const getParagraph  = async (paragraphType: string, paragraphId: string): Promise<node> => {
	const response = await fetch(`${BASE_URL}/paragraph/${paragraphType}/${paragraphId}`);
	const data = await response.json();
	return data;
  } 
  
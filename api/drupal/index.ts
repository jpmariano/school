import { BASE_URL } from '@/api/config';
import { authOptions } from "@/utils/authOptions";
import { NextAuthOptions } from 'next-auth';
import { getServerSession } from "next-auth";
import { NextApiRequest, NextApiResponse } from 'next';
//import NextAuth  from "@/app/api/auth/[...nextauth]"; 
import { PathDetails, lessonid, listOfLessons, node, userinfo,  AccountCredentials, AccountResetCredentials, verifyCredentials, tokenResponse, ErrorResponse, userLoginResponse, CustomSession } from '@/types';
import userData from '@/data/userLogin.json';

export const jsonapi = '/jsonapi';
export const router = '/router';

export function isFetchResponse(response: Response | ErrorResponse): response is Response {
	//console.log('isFetchResponse', response);
	return response.status === 200;
}

//Step 1: user signup - server sends an email
export const userSignup = async  (credentials: AccountCredentials) : Promise<Response | ErrorResponse> =>  {
	const headers = {
		"Content-Type": "application/json",
	  };
	const data = {
		"mail": credentials.username,
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
	
		const result:Response = await response.json();
		return result;
	  } catch (error) {
		return {
			success: false,
			message: error instanceof Error ? error.message : "Unknown error",
			status: 500,
		  };
	  }
}
//Step 2: User clicks on the verification link
export const verifyUser = async  (credentials: verifyCredentials) : Promise<Response | ErrorResponse> =>  {
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
	
		const result:Response = await response.json();
		return result;
	  } catch (error) {
		return {
			success: false,
			message: error instanceof Error ? error.message : "Unknown error",
			status: 500,
		  };
	  }
}

export const userLogin = async  (credentials: AccountCredentials): Promise<Response | ErrorResponse> =>  {
	const headers = {
		"Content-Type": "application/json"
	  };
	const client_id = process.env.CLIENT_ID;
	const client_secret = process.env.NEXTAUTH_SECRET;
 
	if (!client_id || !client_secret) {
		throw new Error("Missing environment variables");
	}

	 // Create a new FormData object
	 const formData = new FormData();
	 formData.append("grant_type", "password");
	 formData.append("client_id", client_id);
	 formData.append("client_secret", client_secret);
	 formData.append("username", credentials.username);
	 formData.append("password", credentials.password);
	  // For debugging, you can log the FormData like this:
	 // console.log('credentials', credentials);
	  //console.log('formData', formData);
	  try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/oauth/token?_format=json`, {
		//const response = await fetch(`${BASE_URL}/oauth/token?_format=json`, {
		  method: "POST",
		  body: formData,
		  redirect: "follow"
		});
		console.log('response', response);
		if (!response.ok) {
		  throw new Error(`HTTP error! status: ${response.status}`);
		}
	
		const result:Response = response;
		return result;
	  } catch (error) {
		return {
			success: false,
			message: error instanceof Error ? error.message : "Unknown error",
			status: 500,
		  };
	  }
}

export const getNewAccessToken = async  (): Promise<Response | ErrorResponse> =>  {
	const session = await getServerSession(authOptions) as CustomSession;
	const headers = {
		"Content-Type": "application/json",
	  };
	const client_id = process.env.CLIENT_ID;
	const client_secret = process.env.NEXTAUTH_SECRET;
 
	if (!client_id || !client_secret) {
		throw new Error("Missing environment variables");
	}

	 // Create a new FormData object
	 const formData = new FormData();
	 formData.append("grant_type", "refresh_token");
	 formData.append("client_id", client_id);
	 formData.append("client_secret", client_secret);
	 formData.append("refresh_token", session.refresh_token as string);
	
	  try {
		const response = await fetch(`${BASE_URL}/oauth/token?_format=json`, {
		  method: "POST",
		  headers: headers,
		  body: formData
		});
	
		if (!response.ok) {
		  throw new Error(`HTTP error! status: ${response.status}`);
		}
	
		const result:Response = await response.json();
		return result;
	  } catch (error) {
		return {
			success: false,
			message: error instanceof Error ? error.message : "Unknown error",
			status: 500,
		  };
	  }
}

export const userLogout= async  () : Promise<Response | ErrorResponse> =>  {
	const session = await getServerSession(authOptions) as CustomSession;
	const headers = {
		"Content-Type": "application/json",
		"Authorization": `Bearer ${session.access_token}`
	  };

	
	  try {
		const response = await fetch(`${BASE_URL}/oauth/revoke?_format=json`, {
		  method: "POST",
		  headers: headers
		});
	
		if (!response.ok) {
		  throw new Error(`HTTP error! status: ${response.status}`);
		}
	
		const result:Response = await response.json();
		return result;
	  } catch (error) {
		return {
			success: false,
			message: error instanceof Error ? error.message : "Unknown error",
			status: 500,
		  };
	  }
}

export const getUserInfo = async (access_token: string): Promise<Response | ErrorResponse> =>  {
	//const session = await getServerSession(authOptions) as CustomSession;
	//console.log(session);
	const headers = {
	  "Content-Type": "application/json",
	  "Authorization": `Bearer ${access_token}`
	};
  
	try {
	  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/oauth/userinfo?_format=json`, {
		method: "GET",
		headers: headers,
	  });
  
	  if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	  }
  
	  const result: Response = response;
	  return result;
	} catch (error) {
	  return {
		success: false,
		message: error instanceof Error ? error.message : "Unknown error",
		status: 500
	  };
	}
  };
  
//step 1. send an email
export const resetPassword = async (emailAddress: string): Promise<Response | ErrorResponse> => {
	const session = await getServerSession(authOptions) as CustomSession;
	const headers = {
		"Content-Type": "application/json",
		"Authorization": `Bearer ${session.access_token}`
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

		const result: Response = await response.json();
		return result;
	} catch (error) {
		return {
			success: false,
			message: error instanceof Error ? error.message : "Unknown error",
			status: 500
		};
	}
}
//step 2. change the password
export const passwordReset = async (accountresetcredentials: AccountResetCredentials): Promise<Response | ErrorResponse> => {
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

		const result: Response = await response.json();
		return result;
	} catch (error) {
		return {
			success: false,
			message: error instanceof Error ? error.message : "Unknown error",
			status: 500
		};
	}
};
  
export const getPage = async (slug: string): Promise<Response | ErrorResponse> => {
    
	const session = await getServerSession(authOptions) as CustomSession;
	console.log('282 - ' + session);
	const headers = {
		"Content-Type": "application/json",
		"Authorization": `Bearer ${session.access_token}`
	};

	try {
		const response = await fetch(`${BASE_URL}/router/translate-path?path=${slug}`, {
			method: "GET",
			headers: headers,
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result: Response = await response.json();
		return result;
	} catch (error) {
		return {
			success: false,
			message: error instanceof Error ? error.message : "Unknown error",
			status: 500
		};
	}
}

//listOfLessons
export const getListofLessonByTaxId = async (taxid: string): Promise<Response | ErrorResponse> => {
	const session = await getServerSession(authOptions) as CustomSession;
	const headers = {
		"Content-Type": "application/json",
		"Authorization": `Bearer ${session.access_token}`
	};
	try {
		const response = await fetch(`${BASE_URL}/api/v1/lesson/${taxid}?_format=json`, {
			method: "GET",
			headers: headers,
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result: Response = await response.json();
		return result;
	} catch (error) {
		return {
			success: false,
			message: error instanceof Error ? error.message : "Unknown error",
			status: 500
		};
	}
  } 
  
//lessonid[]
export const getListofCompletedLessonsbySubject = async (uid: string, taxid: string): Promise<Response | ErrorResponse> => {

	const session = await getServerSession(authOptions) as CustomSession;
	const headers = {
		"Content-Type": "application/json",
		"Authorization": `Bearer ${session.access_token}`
	};
	try {
		const response = await fetch(`${BASE_URL}/api/v1/subject/completed/${uid}/${taxid}?_format=json`, {
			method: "GET",
			headers: headers,
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result: Response = await response.json();
		return result;
	} catch (error) {
		return {
			success: false,
			message: error instanceof Error ? error.message : "Unknown error",
			status: 500
		};
	}
}
  
//lessonid[]
export const getLessonCompletion = async (uid: string, field_lesson_ref: string): Promise<Response | ErrorResponse> => {

	const session = await getServerSession(authOptions) as CustomSession;
	const headers = {
		"Content-Type": "application/json",
		"Authorization": `Bearer ${session.access_token}`
	};
	try {
		const response = await fetch(`${BASE_URL}/api/v1/lesson/completed/${uid}/${field_lesson_ref}?_format=json`, {
			method: "GET",
			headers: headers,
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result: Response = await response.json();
		return result;
	} catch (error) {
		return {
			success: false,
			message: error instanceof Error ? error.message : "Unknown error",
			status: 500
		};
	}
} 
//node
export const getNode = async (uuid = '', bundle = ''): Promise<Response | ErrorResponse> => {

	const session = await getServerSession(authOptions) as CustomSession;
	const headers = {
		"Content-Type": "application/json",
		"Authorization": `Bearer ${session.access_token}`
	};
	let params: string = ``;
	switch (bundle) {
		case 'lesson': {
			params = `include=field_paragraph_lesson.field_image`;
			break;
		}
		default: {
			break;
		}
	}
	try {
		const response = await fetch(`${BASE_URL}/jsonapi/node/${bundle}/${uuid}?${params}`, {
			method: "GET",
			headers: headers,
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result: Response = await response.json();
		return result;
	} catch (error) {
		return {
			success: false,
			message: error instanceof Error ? error.message : "Unknown error",
			status: 500
		};
	}
}
  
export const getTaxonomyTerm = async (uuid: string): Promise<Response | ErrorResponse> => {
	const session = await getServerSession(authOptions) as CustomSession;
	const headers = {
		"Content-Type": "application/json",
		"Authorization": `Bearer ${session.access_token}`
	};
	try {
		const response = await fetch(`${BASE_URL}/jsonapi/taxonomy_term/subject/${uuid}`, {
			method: "GET",
			headers: headers,
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result: Response = await response.json();
		return result;
	} catch (error) {
		return {
			success: false,
			message: error instanceof Error ? error.message : "Unknown error",
			status: 500
		};
	}
  }

  export const getParagraph  = async (paragraphType: string, paragraphId: string): Promise<Response | ErrorResponse> => {
	const session = await getServerSession(authOptions) as CustomSession;
	const headers = {
		"Content-Type": "application/json",
		"Authorization": `Bearer ${session.access_token}`
	};
	try {
		const response = await fetch(`${BASE_URL}/paragraph/${paragraphType}/${paragraphId}`, {
			method: "GET",
			headers: headers,
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result: Response = await response.json();
		return result;
	} catch (error) {
		return {
			success: false,
			message: error instanceof Error ? error.message : "Unknown error",
			status: 500
		};
	}
	
  } 
  
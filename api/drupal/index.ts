import { BASE_URL } from '@/api/config';
import { authOptions } from "@/utils/authOptions";
import { NextAuthOptions } from 'next-auth';
import { getServerSession } from "next-auth";
import { NextApiRequest, NextApiResponse } from 'next';
//import NextAuth  from "@/app/api/auth/[...nextauth]"; 
import { PathDetails, lessonid, listOfLessons, node, userinfo,  AccountCredentials, AccountResetCredentials, verifyCredentials, tokenResponse, ErrorResponse, userLoginResponse, CustomSession, CustomJWT, Token, CompletedLesson } from '@/types';
import userData from '@/data/userLogin.json';
import CustomError from '@/utils/CustomError';

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
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rest/create-account?_format=json`, {
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
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rest/verify-account?_format=json`, {
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
	 //console.log('credentials', credentials);
	 //console.log('formData', formData);
	  try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/oauth/token?_format=json`, {
		//const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/oauth/token?_format=json`, {
		  method: "POST",
		  body: formData,
		  redirect: "follow"
		});
		//console.log('response', response);
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

export const getNewAccessToken = async  (refresh_token: string): Promise<Response | ErrorResponse> =>  {

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
	 formData.append("refresh_token", refresh_token);

	 //console.log('formData', formData);
	// console.log(process.env.NEXT_PUBLIC_API_URL);
	  try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/oauth/token`, {
		  method: "POST",
		  headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		  },
		  body: formData,
		  redirect: "follow"
		});
		//console.log('getNewAccessToken-', response.status);
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

export const refreshAccessToken = async  (custom_token: CustomJWT): Promise<CustomJWT> =>  {

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
	 formData.append("refresh_token", custom_token.refresh_token!);

	 console.log('formData***************', formData);
	// console.log(process.env.NEXT_PUBLIC_API_URL);
	  try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/oauth/token`, {
		  method: "POST",
		  headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		  },
		  body: formData,
		  redirect: "follow"
		});
		console.log('getNewAccessToken-', response.status);
		if (!response.ok) {
		  throw new Error(`HTTP error! status: ${response.status}`);
		}	
		
		const token_data: Token = await response.json();
		return {
			...custom_token,
			access_token: token_data.access_token,
			refresh_token: token_data.refresh_token,
			expires_in: token_data.expires_in,
			issued_at: Date.now() / 1000,
			refreshing: false // Reset the refreshing flag
		  };
		//return result;
	  } catch (error) {
		return {
			...custom_token,
			refreshing: false
		  };
	  }
}

export const userLogout= async  () : Promise<Response | ErrorResponse> =>  {
	const session = await getServerSession(authOptions) as CustomSession;
	const headers = {
		"Content-Type": "application/json",
		"Authorization": `Bearer ${session.user.access_token}`
	  };

	
	  try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/oauth/revoke?_format=json`, {
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
}

export const getSessionToken = async (): Promise<Response | ErrorResponse> =>  {


	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/session/token`, {
			method: "GET"
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
}
  
//step 1. send an email
export const resetPassword = async (emailAddress: string): Promise<Response | ErrorResponse> => {
	const session = await getServerSession(authOptions) as CustomSession;
	const headers = {
		"Content-Type": "application/json",
		"Authorization": `Bearer ${session.user.access_token}`
	};
	const data = {
		"mail": emailAddress
	};

	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/lost-password?_format=json`, {
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
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/lost-password-reset?_format=json`, {
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
	const session: CustomSession = await getServerSession(authOptions) as CustomSession;
	console.log('session-getpage*******', session);

	if (!session) {
	  return {
		success: false,
		message: "No session - Unknown error",
		status: 500
	  };
	}

	const headers = {
		"Content-Type": "application/json",
		"Authorization": `Bearer ${session.user.access_token}`
	};

	try {
		let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/router/translate-path?path=${slug}`, {
			method: "GET",
			headers: headers,
		});

		// Check if the token is invalid or expired and if so, attempt to refresh
		if (response.status === 401 || response.status === 403) {
			console.log('Token expired, attempting to refresh...');
			const refreshedSession: CustomSession = await getServerSession(authOptions) as CustomSession;

			if (!refreshedSession) {
				return {
					success: false,
					message: "Failed to refresh session - Unknown error",
					status: 500
				};
			}

			const refreshedHeaders = {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${refreshedSession.user.access_token}`
			};

			// Retry the request with the new token
			response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/router/translate-path?path=${slug}`, {
				method: "GET",
				headers: refreshedHeaders,
			});
		}

		if (!response.ok) {
			throw new CustomError(`HTTP error! status: ${response.status}`, response.status);
		}

		const result: Response = response;
		return result;
	} catch (error) {
		if (error instanceof CustomError) {
			return {
				success: false,
				message: error.message,
				status: error.statusCode
			};
		}
		return {
			success: false,
			message: error instanceof Error ? error.message : "Unknown error",
			status: 500
		};
	}
};

export const setCompletedLesson = async (completedLesson: CompletedLesson): Promise<Response | ErrorResponse> => {
	const session: CustomSession = await getServerSession(authOptions) as CustomSession;
	console.log('session-getpage*******', session);

	if (!session) {
	  return {
		success: false,
		message: "No session - Unknown error",
		status: 500
	  };
	}

	const headers = {
		"Content-Type": "application/json",
		"Authorization": `Bearer ${session.user.access_token}`
	};

	try {
		let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/node?_format=json`, {
			method: "POST",
			headers: headers,
			body: JSON.stringify(completedLesson)
		});

		// Check if the token is invalid or expired and if so, attempt to refresh
		if (response.status === 401 || response.status === 403) {
			console.log('Token expired, attempting to refresh...');
			const refreshedSession: CustomSession = await getServerSession(authOptions) as CustomSession;

			if (!refreshedSession) {
				return {
					success: false,
					message: "Failed to refresh session - Unknown error",
					status: 500
				};
			}

			const refreshedHeaders = {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${refreshedSession.user.access_token}`
			};

			// Retry the request with the new token
			response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/node?_format=json`, {
				method: "GET",
				headers: refreshedHeaders,
				body: JSON.stringify(completedLesson)
			});
		}

		if (!response.ok) {
			throw new CustomError(`HTTP error! status: ${response.status}`, response.status);
		}

		const result: Response = response;
		return result;
	} catch (error) {
		if (error instanceof CustomError) {
			return {
				success: false,
				message: error.message,
				status: error.statusCode
			};
		}
		return {
			success: false,
			message: error instanceof Error ? error.message : "Unknown error",
			status: 500
		};
	}
};

export const revokeToken = async (accessToken: string): Promise<void> =>  {
	if (!accessToken) {
		console.error('No access token provided for revocation');
	}

	const headers = {
		"Content-Type": "application/json",
		"Authorization": `Bearer ${accessToken}`
	};


	try {
	  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/oauth/revoke`, {
		method: 'POST',
		headers: headers });
  
	  if (!response.ok) {
		console.error('Failed to revoke token:', await response.text());
	  }
	} catch (error) {
		if (error instanceof CustomError) {
			console.log('Error revoking token:', error.statusCode);
		} else {
			console.error('Error revoking token:', error);
		}
	  
	}
  }

//listOfLessons
export const getListofLessonByTaxId = async (taxid: string): Promise<Response | ErrorResponse> => {
	const session = await getServerSession(authOptions) as CustomSession;
	const headers = {
		"Content-Type": "application/json",
		"Authorization": `Bearer ${session.user.access_token}`
	};
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/lesson/${taxid}?_format=json`, {
			method: "GET",
			headers: headers,
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result: Response = response;
		return result;
	} catch (error) {
		if (error instanceof CustomError) {
			return {
				success: false,
				message: error.message,
				status: error.statusCode
			};
		}
		return {
			success: false,
			message: error instanceof Error ? error.message : "Unknown error",
			status: 500
		};
	}
  } 
  
//lessonid[]
export const getListofCompletedLessonsbySubject = async (uid: string, taxid: string): Promise<Response | ErrorResponse> => {

	const session: CustomSession = await getServerSession(authOptions) as CustomSession;
	const headers = {
		"Content-Type": "application/json",
		"Authorization": `Bearer ${session.user.access_token}`
	};
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/subject/completed/${uid}/${taxid}?_format=json`, {
			method: "GET",
			headers: headers,
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result: Response = response;
		return result;
	} catch (error) {
		if (error instanceof CustomError) {
			return {
				success: false,
				message: error.message,
				status: error.statusCode
			};
		}
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
		"Authorization": `Bearer ${session.user.access_token}`
	};
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/lesson/completed/${uid}/${field_lesson_ref}?_format=json`, {
			method: "GET",
			headers: headers,
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result: Response = response;
		return result;
	} catch (error) {
		if (error instanceof CustomError) {
			return {
				success: false,
				message: error.message,
				status: error.statusCode
			};
		}
		return {
			success: false,
			message: error instanceof Error ? error.message : "getLessonCompletion error",
			status: 500
		};
	}
} 
//node
export const getNode = async (uuid = '', bundle = ''): Promise<Response | ErrorResponse> => {

	const session = await getServerSession(authOptions) as CustomSession;
	const headers = {
		"Content-Type": "application/json",
		"Authorization": `Bearer ${session.user.access_token}`
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
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jsonapi/node/${bundle}/${uuid}?${params}`, {
			method: "GET",
			headers: headers,
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result: Response = response;
		return result;
	} catch (error) {
		if (error instanceof CustomError) {
			return {
				success: false,
				message: error.message,
				status: error.statusCode
			};
		}
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
		"Authorization": `Bearer ${session.user.access_token}`
	};
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jsonapi/taxonomy_term/subject/${uuid}`, {
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
		"Authorization": `Bearer ${session.user.access_token}`
	};
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/paragraph/${paragraphType}/${paragraphId}`, {
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
  